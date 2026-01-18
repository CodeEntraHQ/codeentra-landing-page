import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUpdates } from '../../services/api';
import { TrendingUp, Sparkles, Zap, Megaphone } from 'lucide-react';

const UpdatesSection = () => {
  const { data: updatesData, isLoading, error } = useQuery({
    queryKey: ['updates'],
    queryFn: getAllUpdates,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const updates = updatesData?.data || [];
  const [visibleUpdates, setVisibleUpdates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (updates.length > 0) {
      setVisibleUpdates(updates.slice(0, 3)); // Show 3 updates at a time
    }
  }, [updates]);

  useEffect(() => {
    if (updates.length > 3) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 3) % updates.length);
        setVisibleUpdates(updates.slice(currentIndex, currentIndex + 3));
      }, 5000); // Rotate every 5 seconds
      return () => clearInterval(interval);
    }
  }, [updates, currentIndex]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'announcement':
        return <Megaphone className="w-6 h-6" />;
      case 'news':
        return <Sparkles className="w-6 h-6" />;
      case 'feature':
        return <Zap className="w-6 h-6" />;
      case 'update':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <TrendingUp className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'announcement':
        return 'from-green-500 to-green-700';
      case 'news':
        return 'from-blue-500 to-blue-700';
      case 'feature':
        return 'from-purple-500 to-purple-700';
      case 'update':
        return 'from-orange-500 to-orange-700';
      default:
        return 'from-green-500 to-green-700';
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">Loading updates...</div>
        </div>
      </section>
    );
  }

  if (error || !updates || updates.length === 0) {
    return null; // Don't show section if no updates
  }

  return (
    <section id="updates" className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-700 rounded-full mb-4 shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest Updates & Announcements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest news, features, and announcements
          </p>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleUpdates.map((update, index) => (
            <div
              key={update.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 animate-slide-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Top Bar */}
              <div className={`h-2 bg-gradient-to-r ${getTypeColor(update.type)}`}></div>

              {/* Content */}
              <div className="p-6">
                {/* Type Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r ${getTypeColor(update.type)} text-white text-xs font-semibold shadow-md`}>
                    {getTypeIcon(update.type)}
                    <span className="capitalize">{update.type || 'announcement'}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 ${
                  update.type === 'announcement' ? 'group-hover:text-green-700' :
                  update.type === 'news' ? 'group-hover:text-blue-700' :
                  update.type === 'feature' ? 'group-hover:text-purple-700' :
                  update.type === 'update' ? 'group-hover:text-orange-700' :
                  'group-hover:text-green-700'
                }`}>
                  {update.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {update.description}
                </p>

                {/* Date */}
                <div className="flex items-center text-xs text-gray-500 pt-4 border-t border-gray-100">
                  <span>
                    {new Date(update.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 transition-all duration-500 pointer-events-none ${
                update.type === 'announcement' ? 'bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-green-500/10' :
                update.type === 'news' ? 'bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10' :
                update.type === 'feature' ? 'bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/10' :
                update.type === 'update' ? 'bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-orange-500/10' :
                'bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-green-500/10'
              }`}></div>

              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* View All Indicator (if more than 3 updates) */}
        {updates.length > 3 && (
          <div className="text-center mt-8 animate-pulse">
            <p className="text-sm text-gray-500">
              Showing {visibleUpdates.length} of {updates.length} updates
            </p>
          </div>
        )}
      </div>

    </section>
  );
};

export default UpdatesSection;

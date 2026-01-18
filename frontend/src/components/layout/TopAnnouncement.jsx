import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUpdates } from '../../services/api';
import { X, Megaphone, Sparkles, Zap, TrendingUp, ChevronRight } from 'lucide-react';

const TopAnnouncement = () => {
  const { data: updatesData, isLoading } = useQuery({
    queryKey: ['updates'],
    queryFn: getAllUpdates,
    refetchInterval: 30000,
  });

  const [isVisible, setIsVisible] = useState(true);
  const [dismissedId, setDismissedId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extract updates from API response
  const updates = useMemo(() => {
    if (!updatesData) return [];
    // Handle both direct array and nested data structure
    if (Array.isArray(updatesData)) {
      return updatesData;
    }
    return updatesData?.data || [];
  }, [updatesData]);
  
  // Filter out dismissed updates and ensure we have active updates (memoized to prevent re-renders)
  const activeUpdates = useMemo(() => {
    if (!updates || updates.length === 0) return [];
    return updates.filter(update => {
      // Only check component state for dismissed updates (not localStorage)
      // This ensures dismissed notifications come back after page refresh
      const isActive = update.isActive === true || update.isActive === undefined;
      return update.id !== dismissedId && isActive;
    });
  }, [updates, dismissedId]);

  const currentUpdate = activeUpdates.length > 0 ? activeUpdates[currentIndex] : null;

  // Debug: Log updates (remove in production)
  useEffect(() => {
    console.log('🔔 TopAnnouncement Debug:', {
      isLoading,
      updatesData,
      updates: updates.length,
      activeUpdates: activeUpdates.length,
      currentIndex,
      currentUpdate: currentUpdate?.title,
      isVisible,
      dismissedId
    });
  }, [isLoading, updatesData, updates.length, activeUpdates.length, currentIndex, currentUpdate, isVisible, dismissedId]);

  // Reset index if out of bounds when updates change
  useEffect(() => {
    if (activeUpdates.length > 0) {
      if (currentIndex >= activeUpdates.length) {
        setCurrentIndex(0);
      }
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [activeUpdates.length, currentIndex]);

  // Rotate through all active updates every 2 seconds
  useEffect(() => {
    if (activeUpdates.length <= 1) {
      return; // Don't rotate if there's 0 or 1 update
    }

    // Ensure we start from a valid index
    if (currentIndex >= activeUpdates.length) {
      setCurrentIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const length = activeUpdates.length;
        if (length === 0) return 0;
        return (prev + 1) % length;
      });
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, [activeUpdates.length]);

  // Show/hide based on available updates
  useEffect(() => {
    if (activeUpdates.length > 0) {
      setIsVisible(true);
      // Reset dismissedId if we have new updates
      if (dismissedId && activeUpdates.some(u => u.id !== dismissedId)) {
        setDismissedId(null);
      }
    } else {
      setIsVisible(false);
    }
  }, [activeUpdates.length, activeUpdates, dismissedId]);

  const handleDismiss = () => {
    if (currentUpdate) {
      // Only use component state, not localStorage
      // This ensures notification comes back after page refresh
      setDismissedId(currentUpdate.id);
      
      // Move to next available update if there are more
      if (activeUpdates.length > 1) {
        const nextIndex = (currentIndex + 1) % activeUpdates.length;
        setCurrentIndex(nextIndex);
      } else {
        // No more updates, hide the component
        setIsVisible(false);
      }
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'announcement':
        return <Megaphone className="w-4 h-4" />;
      case 'news':
        return <Sparkles className="w-4 h-4" />;
      case 'feature':
        return <Zap className="w-4 h-4" />;
      case 'update':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'announcement':
        return 'bg-green-500';
      case 'news':
        return 'bg-blue-500';
      case 'feature':
        return 'bg-purple-500';
      case 'update':
        return 'bg-orange-500';
      default:
        return 'bg-green-500';
    }
  };

  // Don't show if loading
  if (isLoading) {
    return null;
  }

  // Don't show if no active updates
  if (activeUpdates.length === 0) {
    return null;
  }

  // Don't show if not visible
  if (!isVisible) {
    return null;
  }

  // Don't show if no current update
  if (!currentUpdate) {
    return null;
  }

  // Don't show if current update is dismissed (check component state only)
  if (currentUpdate.id === dismissedId) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slide-in-right" style={{ maxWidth: '144px', width: '144px' }}>
      {/* Glassmorphism Card with Gradient Border */}
      <div className={`relative rounded-lg overflow-hidden group transition-all duration-500 hover:scale-[1.02] shadow-xl`}>
        {/* Gradient Border Effect */}
        <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${getTypeColor(currentUpdate.type)} opacity-30 blur-md group-hover:opacity-40 transition-all duration-500`}></div>
        
        {/* Glass Background */}
        <div className="relative bg-white/95 backdrop-blur-xl border-2 border-white/30 rounded-lg shadow-xl transition-all duration-500">
          {/* Animated Gradient Overlay */}
          <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${getTypeColor(currentUpdate.type)} transition-colors duration-500`}></div>
          
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-1 right-1 p-0.5 rounded-full bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/90 transition-all duration-200 z-10 shadow-md hover:shadow-lg"
            aria-label="Close announcement"
          >
            <X className="w-2.5 h-2.5 text-gray-700 hover:text-gray-900" />
          </button>

          {/* Content */}
          <div className="p-2 pr-7">
            <div className="flex flex-col space-y-1">
              {/* Type Badge - Full Width, Single Line */}
              <div className="flex items-center justify-center">
                <span className={`text-[9px] font-bold uppercase tracking-tighter ${getTypeColor(currentUpdate.type)} text-white px-1.5 py-0.5 rounded shadow-md transition-all duration-500 text-center w-full whitespace-nowrap overflow-hidden text-ellipsis`}>
                  {currentUpdate.type || 'Announcement'}
                </span>
              </div>
              
              {/* Icon and Title Row */}
              <div className="flex items-center space-x-1.5">
                {/* Icon with Glow Effect */}
                <div className={`flex-shrink-0 ${getTypeColor(currentUpdate.type)} text-white p-1 rounded shadow-lg relative transition-all duration-500`}>
                  <div className={`absolute inset-0 ${getTypeColor(currentUpdate.type)} opacity-50 blur-md transition-all duration-500`}></div>
                  <div className="relative">
                    {getTypeIcon(currentUpdate.type)}
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-[10px] font-bold text-gray-900 line-clamp-1 drop-shadow-sm transition-all duration-500 flex-1">
                  {currentUpdate.title}
                </h4>
              </div>
              
              {/* Description */}
              <p className="text-[9px] text-gray-700 line-clamp-1 mb-1 leading-tight transition-all duration-500">
                {currentUpdate.description}
              </p>
              
              {/* Date and Link */}
              <div className="flex items-center justify-between pt-1 border-t border-gray-200/60">
                <span className="text-[9px] text-gray-600 font-medium">
                  {new Date(currentUpdate.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </span>
                <a
                  href="#updates"
                  className="flex items-center text-[9px] font-semibold text-green-700 hover:text-green-800 transition-all duration-200 group/link"
                >
                  More
                  <ChevronRight className="w-2 h-2 ml-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Shimmer Effect on Hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none rounded-lg"></div>
          
          {/* Animated Border Glow */}
          <div className={`absolute inset-0 rounded-lg ${getTypeColor(currentUpdate.type)} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10`}></div>
          
          {/* Update Indicator */}
          {activeUpdates.length > 1 && (
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {activeUpdates.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    index === currentIndex
                      ? `${getTypeColor(currentUpdate.type)} opacity-100 shadow-md`
                      : 'bg-gray-400 opacity-40'
                  }`}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopAnnouncement;

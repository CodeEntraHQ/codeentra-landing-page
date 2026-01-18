import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUpdates } from '../../services/api';
import { Megaphone, Sparkles, Zap, TrendingUp, ChevronRight } from 'lucide-react';

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
    <div className="fixed top-[80px] left-0 right-0 z-[45] w-full animate-slide-in-from-left">
      {/* Horizontal Banner Bar - Centered with Margins */}
      <div className="relative w-full overflow-hidden group transition-all duration-500 shadow-md backdrop-blur-sm border-b border-gray-200/30 bg-gradient-to-r from-white via-gray-50/50 to-white">
        {/* Container with equal left/right margins */}
        <div className="mx-4 md:mx-8 lg:mx-12 xl:mx-16 py-2.5">
          {/* Marquee Wrapper */}
          <div className="relative overflow-hidden">
            {/* Marquee Content */}
            <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
              {/* Content repeated for seamless loop */}
              {[...Array(3)].map((_, repeatIndex) => (
                <div key={repeatIndex} className="flex items-center gap-6 flex-shrink-0">
                  {/* Icon */}
                  <div className={`flex-shrink-0 ${getTypeColor(currentUpdate.type)} text-white p-1.5 rounded shadow-md relative transition-all duration-300`}>
                    {getTypeIcon(currentUpdate.type)}
                  </div>
                  
                  {/* Type Badge */}
                  <span className={`text-xs font-bold uppercase tracking-wide ${getTypeColor(currentUpdate.type)} text-white px-2.5 py-1 rounded shadow-sm transition-all duration-300 whitespace-nowrap`}>
                    {currentUpdate.type || 'Announcement'}
                  </span>
                  
                  {/* Title */}
                  <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                    {currentUpdate.title}
                  </span>
                  
                  {/* Separator */}
                  <span className="text-gray-300">•</span>
                  
                  {/* Description */}
                  <span className="text-xs text-gray-600 whitespace-nowrap">
                    {currentUpdate.description}
                  </span>
                  
                  {/* Separator */}
                  <span className="text-gray-300">•</span>
                  
                  {/* Date */}
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(currentUpdate.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                  
                  {/* Link */}
                  <a
                    href="#updates"
                    className="flex items-center text-xs font-semibold text-green-700 hover:text-green-800 transition-all duration-200 whitespace-nowrap"
                  >
                    More
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </a>
                  
                  {/* Separator between repeats */}
                  {repeatIndex < 2 && <span className="text-gray-300 mx-2">•</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shimmer Effect on Hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default TopAnnouncement;

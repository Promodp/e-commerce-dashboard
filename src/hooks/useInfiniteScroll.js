import { useState, useEffect } from 'react';

const useInfiniteScroll = (loadMore) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      // Check if the user has scrolled to the bottom
      if (scrollHeight - scrollTop <= clientHeight + 5 && !isFetching) {
        setIsFetching(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;

    const fetchMore = async () => {
      await loadMore(); // Call the function to load more items
      setIsFetching(false); // Reset the fetching state
    };
    fetchMore();
  }, [isFetching, loadMore]);

  return;
};

export default useInfiniteScroll;

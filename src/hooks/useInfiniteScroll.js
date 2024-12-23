import { useState, useEffect } from 'react';

const useInfiniteScroll = (loadMore) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10;

      if (bottom && !isFetching) {
        setIsFetching(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;

    const fetchMore = async () => {
      await loadMore(); // Call the function to load more items
      setIsFetching(false); // Reset the fetching state
    };

    fetchMore();
  }, [isFetching, loadMore]);

  return isFetching;
};

export default useInfiniteScroll;

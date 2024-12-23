import { useState, useEffect } from 'react';

const useInfiniteScroll = (loadMore) => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
      if (bottom && !isScrolling) {
        setIsScrolling(true);
        loadMore(); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling, loadMore]);

  useEffect(() => {
    if (isScrolling) {
      setIsScrolling(false); 
    }
  }, [isScrolling]);

  return isScrolling;
};

export default useInfiniteScroll;

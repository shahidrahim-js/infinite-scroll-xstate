import React, {useEffect} from 'react';

function InfiniteScroll({handleIsSend, loading, children}) {
 const handleScroll = () => {
  if (window.innerHeight + document.documentElement.scrollTop ===
    document.documentElement.offsetHeight) {
      handleIsSend();
  }
};

 useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 return (
    <>
      {children}
      {loading && <p>Loading...</p>}
    </>
  );
}

export default InfiniteScroll;

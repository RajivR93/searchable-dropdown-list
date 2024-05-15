import React, { useEffect, useState } from 'react';

const TimeAgo: React.FC<{ timestamp: number }> = ({ timestamp }) => {
  const [timeDifference, setTimeDifference] = useState('');

  useEffect(() => {
    function calculateTimeDifference() {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - timestamp;

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        return 'Just now';
      }
    }

    const interval = setInterval(() => {
      setTimeDifference(calculateTimeDifference());
    }, 60000); // Update every minute

    // Update the time difference immediately
    setTimeDifference(calculateTimeDifference());

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [timestamp]);

  return <span>{timeDifference}</span>;
};

export default TimeAgo;

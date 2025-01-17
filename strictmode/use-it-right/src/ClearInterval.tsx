import React from 'react';

const ClearInterval = () => {
  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setCounter((prev) => prev + 1), 500);
    return () => clearInterval(interval);
  }, []);
  return <div>Example ClearInterval: {counter}</div>;
};

export default ClearInterval;

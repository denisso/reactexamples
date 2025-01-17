import React from 'react';
const EventListener = () => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    const handlerClick = () => {
      setCounter((prev) => prev + 1);
    };
    buttonRef.current?.addEventListener('click', handlerClick);
    return () => buttonRef.current?.removeEventListener('click', handlerClick);
  }, []);
  return (
    <div>
      Example EventListener: <button ref={buttonRef}>{counter} + 1</button>
    </div>
  );
};

export default EventListener;

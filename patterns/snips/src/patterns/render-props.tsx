import React, { useState } from 'react';

const Counter = ({
  render,
}: {
  render: (count: number, increment: () => void) => React.ReactNode;
}) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return <>{render(count, increment)}</>;
};

const RenderProps = () => {
  return (
    <div>
      <h1>Render Props Example</h1>

      <Counter
        render={(count, increment) => (
          <div>
            <p>Current count: {count}</p>
            <button onClick={increment}>Increment</button>
          </div>
        )}
      />

      <Counter
        render={(count, increment) => (
          <div>
            <h2>Custom Counter</h2>
            <button onClick={increment}>Add 1 (Current: {count})</button>
          </div>
        )}
      />
    </div>
  );
};

export default RenderProps;

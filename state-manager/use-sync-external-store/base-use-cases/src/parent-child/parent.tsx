import { ids } from './data';
import { useState } from './api';
import { Child } from './child';

export const Parent = () => {
  const arr = useState(ids);
  return (
    <>
      {arr.ids.map((id) => (
        <Child key={id} />
      ))}
    </>
  );
};

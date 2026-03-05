import React from 'react';
import { ids, updateAnpPlusOne, reCreateCounters } from './data';
import { useState } from './api';
import { Child } from './child';

const InputCounters = () => {
  const [num, setNum] = React.useState(0);
  return (
    <>
      <button onClick={() => reCreateCounters(num)}>Set Num Counters: </button>
      <input onChange={(e) => setNum(+e.target.value)} value={num} />
    </>
  );
};

export const Parent = () => {
  const arr = useState(ids);

  return (
    <>
      <div>
        <button onClick={updateAnpPlusOne}>Update counters</button>
        <InputCounters />
      </div>
      <div>
        {arr.ids.map((id) => (
          <Child id={id} key={id} />
        ))}
      </div>
    </>
  );
};

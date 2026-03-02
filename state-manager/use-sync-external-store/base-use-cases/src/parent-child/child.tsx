import { Provider, useById, useState } from './api';
import { dictId, dict } from './data';

type Props = { id: number };

export const Child = ({ id }: Props) => {
  return (
    <div>
      <Provider value={{ [dictId]: dict[id] }}>
        <Reader />
        <Writter />
      </Provider>
    </div>
  );
};

const Reader = () => {
  const store = useById(dictId);
  const state = useState(store);
  return <>State:{state.count}</>;
};

const Writter = () => {
  const store = useById(dictId);
  const state = useState(store);
  return (
    <button
      onClick={() => {
        store.set({ count: state.count + 1 });
      }}
    >
      +1
    </button>
  );
};

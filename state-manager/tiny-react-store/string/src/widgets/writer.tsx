import { store, useStore } from '../store';
export const Writer = () => {
  const count = useStore('one');
  return (
    <div>
      <button
        onClick={() => {
          store.one.notify(store.one.value + 1);
        }}
      >
        {count}+1
      </button>
    </div>
  );
};

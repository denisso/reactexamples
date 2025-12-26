import { store } from '../store';
export const Writer = () => {
  return (
    <div>
      <button
        onClick={() => {
          store.one.notify(store.one.value + 1);
        }}
      >
        +1
      </button>
    </div>
  );
};

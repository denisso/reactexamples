import React from 'react';

/* ===========================
   External store
=========================== */

type Listener = () => void;

function createCounterStore(initial: number) {
  let count = initial;
  const listeners = new Set<Listener>();

  return {
    getSnapshot() {
      return count;
    },

    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    set(value: number) {
      if (value === count) return;
      count = value;
      listeners.forEach((l) => l());
    },
  };
}

const counterStore = createCounterStore(0);

/* ===========================
   Context
=========================== */

const CounterContext = React.createContext(counterStore);

/* ===========================
   Provider
=========================== */

function CounterProvider({ children }: { children: React.ReactNode }) {
  return (
    <CounterContext.Provider value={counterStore}>
      {children}
    </CounterContext.Provider>
  );
}

/* ===========================
   Hook
=========================== */

function useCounter() {
  const store = React.useContext(CounterContext);

  const count = React.useSyncExternalStore(store.subscribe, store.getSnapshot);

  return {
    count,
    set: store.set,
  };
}

/* ===========================
   Writer
=========================== */

function CounterWriter() {
  const { set } = useCounter();

  return <button onClick={() => set(10)}>Set to 10</button>;
}

/* ===========================
   Reader
=========================== */

function CounterReader() {
  const { count } = useCounter();
  return <div>Count: {count}</div>;
}

export const Counter = () => {
  return (
    <CounterProvider>
      <CounterWriter />
      <CounterReader />
    </CounterProvider>
  );
};

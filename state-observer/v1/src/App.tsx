import React from 'react';

function useContext() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}

type State = {
  setCounter: (arg: number) => void;
  counter: number;
};

type Observer = ((state: State) => void) | null;

class StateObserver {
  private state: State = {
    counter: 0,
    setCounter: (value) => (this.state.counter = value),
  };

  private observer: Observer = null;
  attach(cb: (arg: State) => void): number {
    this.observer = cb;
    return 0;
  }

  detach(indx: 0): void {
    this.observer = null;
    console.log(indx);
  }

  notify() {
    this.state.counter++;
    if (this.observer instanceof Function) this.observer(this.state);
  }
}

type ContextType =
  | {
      so: React.RefObject<StateObserver>;
    }
  | undefined;
const Context = React.createContext<ContextType>(undefined);

type ProviderProps = {
  children: React.ReactNode;
};
const Provider = ({ children }: ProviderProps) => {
  const so = React.useRef<StateObserver>(new StateObserver());
  return <Context.Provider value={{ so }}>{children}</Context.Provider>;
};

const Foo = () => {
  const c = useContext();
  const [state, setState] = React.useState(0);
  React.useEffect(() => {
    const so = c.so.current;
    const getState = (state: State) => setState(state.counter);
    so?.attach(getState);
  }, [c]);
  return <div>{state}</div>;
};

const Boo = () => {
  const c = useContext();
  console.log('render Boo');
  return <button onClick={() => c.so.current?.notify()}>Plus one</button>;
};

const Woo = () => {
  console.log('render Woo');
  return <></>;
};
function App() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    setInterval(() => {
      setCount((prev) => prev + 1);
    }, 500);
  }, []);
  return (
    <Provider>
      <Foo />
      <Boo />
      <Woo />
      <div>{count}</div>
    </Provider>
  );
}

export default App;

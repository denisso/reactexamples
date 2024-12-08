import React from 'react';

class MethodsObserver {
  constructor() {
    console.log('constructed');
  }
}
function useConstructSMProxy() {
  const methodsRef = React.useRef<MethodsObserver | null>(null);

  if (methodsRef.current === null) {
    methodsRef.current = new MethodsObserver();
  }

  return methodsRef.current;
}

function ContextProvider({ children }: { children: React.ReactNode }) {
  const methodsObserver = useConstructSMProxy();

  React.useEffect(() => {}, [methodsObserver]);

  return <>{children}</>;
}

function App() {
  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 500);
  }, []);
  return (
    <ContextProvider>
      <div>{counter}</div>
    </ContextProvider>
  );
}

export default App;

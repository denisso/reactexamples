import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Можно отобразить запасной UI
      return fallback ? (
        fallback
      ) : (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo && errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return children;
  }
}

const DataHolder = () => {
  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch('https://jsonplaceholder.typicode.com/todos/1', { signal })
      .then((_) => setCounter((prev) => prev + 1))
      .catch(() => setCounter(-1));
    return () => {
      abortController.abort();
    };
  }, []);
  return <>{counter == -1 ? 'Error' : counter}</>;
};

const AbortController = () => {
  const [mount, setMount] = React.useState(false);
  const handlerClick = () => {
    setMount((prev) => !prev);
  };
  return (
    <ErrorBoundary>
      <div>
        Example: Abort Controller{' '}
        <button onClick={handlerClick}>
          {' '}
          Mount {mount ? <DataHolder /> : <></>}
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default AbortController;

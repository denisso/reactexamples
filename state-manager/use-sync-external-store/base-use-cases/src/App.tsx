import { Counter } from './counter';
import { StatusBar } from './browser-api';
import { Parent } from './parent-child';

import './App.css';

function App() {
  return (
    <>
      <Counter />
      <StatusBar />
      <Parent />
    </>
  );
}

export default App;

import './App.css';
import { Writer, Reader } from './widgets';

function App() {
  console.log('render' + Date.now());
  return (
    <>
      <Reader />
      <Reader />
      <Writer />
    </>
  );
}

export default App;

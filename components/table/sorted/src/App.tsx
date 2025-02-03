import Table from './Table';
import data from './data';

const thead = ['id', 'name', 'age'];
function App() {
  return <Table data={data} thead={thead} />;
}

export default App;

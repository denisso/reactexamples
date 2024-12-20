import React from 'react';
import ReactDOM from 'react-dom';
import SelectWithSuggest from './SelectSuggest';

const App = () => {
  const options = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Grape',
    'Lemon',
    'Mango',
    'Orange',
    'Pineapple',
    'Strawberry',
  ];

  const handleSelect = (option) => {
    console.log('Selected:', option);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Select with Suggest Menu</h1>
      <SelectWithSuggest options={options} onSelect={handleSelect} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

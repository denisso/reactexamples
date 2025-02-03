const generateRandomName = () => {
  const names = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eva',
    'Frank',
    'Grace',
    'Hank',
    'Ivy',
    'Jack',
    'John',
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const generateRandomAge = () => {
  return Math.floor(Math.random() * 50) + 18;
};

const generateArray = (length) => {
  return Array.from({ length }, (_, index) => ({
    id: index + 1,
    name: generateRandomName(),
    age: generateRandomAge(),
  }));
};

export default generateArray(30);

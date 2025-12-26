import { useStore } from '../store';

export const Reader = () => {
  const count = useStore('one');
  return <div>Curent value: {count}</div>;
};

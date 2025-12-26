import { useStore } from '../store';

export const Reader = () => {
  const count = useStore((store) => store.one);
  return <div>Curent value: {count}</div>;
};

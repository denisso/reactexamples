import { useSelector, useDispatch } from 'react-redux';

export default function Counter() {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>
          Decrement
        </button>
      </div>
    </div>
  );
}

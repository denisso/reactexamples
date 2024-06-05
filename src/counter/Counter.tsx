import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, selectCount } from './counterSlice';

export default () => {
  const counterValue = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Counter</h2>
      <div className="counterValuePrint">{counterValue}</div>
      <button onClick={() => dispatch(increment())}>Increase</button>
      <button onClick={() => dispatch(decrement())}>Decrease</button>
    </div>
  );
};

import { useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';

const Counter = () => {
  /*
    The useSelector and useStore hooks
    useStore hook gives us direct access to the store.

    But useSelector is a bit more convenient to use 
    because that allows us to then automatically select a part of our state managed by the store.

    useSelector takes a function which will be executed by a React Redux 
    which takes the store as input and returns a piece of data we wanna extract from our store.

    When you use useSelector, React Redux will automatically set up a subscription to the Redux store 
    for this component. So your component will be updated and will receive the latest counter automatically
    whenever that data changes in the Redux store.
    If you ever would unmount this component or if it would be removed from the DOM for whatever reason,
    React Redux would also automatically clear the subscription for you.

    Side Note - the 'store' arg which useSelector gets it is the one which is setup in index.js via Provider
  */
  const counter = useSelector((state) => state.counter);
  const showCounter = useSelector((state) => state.showCounter);

  /*
    useDispatch hook is used to dispatch actions on the Redux store.
    useDispatch returns a function which we can use to dispatch actual actions.
  */
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch({ type: 'increment' }); // dispatch 'increment' action
  };

  const increaseHandler = () => {
    dispatch({ type: 'increase', amount: 5 }); // dispatch 'increase' action and passing payload
  };

  const decrementHandler = () => {
    dispatch({ type: 'decrement' }); // dispatch 'decrement' action
  };

  const toggleCounterHandler = () => {
    dispatch({ type: 'toggle' }); // dispatch 'toggle' action
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

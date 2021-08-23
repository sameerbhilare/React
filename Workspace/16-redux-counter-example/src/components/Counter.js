import { useSelector } from 'react-redux';
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
  */
  const counter = useSelector((state) => state.counter);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

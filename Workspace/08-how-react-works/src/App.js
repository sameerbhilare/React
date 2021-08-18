import React, { useState, useCallback, useMemo } from 'react';

import './App.css';
import DemoList from './components/Demo/DemoList';
import Button from './components/UI/Button/Button';

function App() {
  /*
    The first time ever a component is rendered/run, 
    useState(), when executed creates a new state variable which is handed off to React 
    and which is managed by React.
    React then basically memorizes to which component that belongs. 
    And it uses the default value to initialize the state with that value.

    For subsequent component function calls, so for reevaluations of the component,
    when useState is being called, no new state is being created. 
    Instead, React recognizes that it already has a state for this component.
    and it instead simply updates that state as needed 
    because this component function reran because some state changed most likely, 
    and therefore React will only do that state management and updating. 

    It will never reinitialize the state 
    unless the component was totally removed from the DOM in the meantime.

    This same is true for useReducer()
  */
  const [listTitle, setListTitle] = useState('My List');

  /*
    useCallback() is a hook that allows React to basically store a function across component executions.
    So it tells React that this function should not be recreated.
    We just need to pass the function which we want to store as 1st arg to useCallback()

    useCallback() works in the similar way as that of useEffect(). 
    It requires dependencies as 2nd arg. And whenever the dependencies change, 
    the function inside useCallback() should be recreated.
  */
  const changeTitleHandler = useCallback(() => {
    /*
      calling below state update function setListTitle() will not immediately update the state
      but react will "schedule" the state update. So it will not be available on the next line.
      
      If there are multiple state changes to the same state, 
      React guarantees that those are scheduled in their order.

      Lets say if there are 2 state changes to 2 different states 
      AND if they are in the same synchronous code, 
      e.g. calling setListTitle('New Title'); setAnotherState('ABCD'); 
      Here react does not create 2 different "schedules" 
      but it will create one single "batch" of scheduled state changes.
    */
    setListTitle('New Title');
  }, []);

  /*
    useMemo basically allows you to basically "memoize"/store any kind of data which you want to store.
    Just like useCallback does it for functions.
    This will ensure that the === check which react does inside DemoList will work properly 
    since arrays are reference types so 2 different arrays of same element are never ===.
    useMemo() stores that array/object. Hence === passes.

    useMemo is far less often used than you use useCallback 
    because memorizing functions is much more useful, and you need that more often than memorizing data.
    You essentially wanna memorize data if it would be performance-intensive 
    to recalculate something based on it.
    Otherwise, it might not really be worth it because if you store data with useMemo,
    of course, it occupies some memory and of course this storing functionality also takes up some performance.
    So this is not something you wanna use on every value you're using.
  */
  const listItems = useMemo(() => [5, 3, 1, 10, 9], []); // no dependencies as we dont want to update it

  return (
    <div className='app'>
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;

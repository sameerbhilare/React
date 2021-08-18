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
    setListTitle('New Title');
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className='app'>
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;

import React, { useState, useCallback, useMemo } from 'react';

import './App.css';
import DemoList from './components/Demo/DemoList';
import Button from './components/UI/Button/Button';

function App() {
  const [listTitle, setListTitle] = useState('My List');

  /*
    useCallback() is a hook that allows React to basically store a function across component executions.
    So it tells React that this function should not be recreated.
    We just need to pass the function which we want to store as 1st arg to useCallback()
    useCallback() works in the similar way as that of useEffect(). It requires dependencies as 2nd arg.
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

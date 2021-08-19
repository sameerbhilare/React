import { useEffect, useState } from 'react';

/*
    Cuustom hook name MUST start with 'use' word.
    The word 'use' signals to react that it will be a custom hook 
    and it gives react the guarantee that you will use that function by respecting the "rules of hooks"
    So you will use this custom hook function just as you use to built-in hooks.

    Custom Hook function can accept parameters just like built-in hooks.
*/
const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (forwards ? prevCounter + 1 : prevCounter - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]); // 'forwards' is external dependencies

  // we can return anything we want
  return counter;
};

export default useCounter;

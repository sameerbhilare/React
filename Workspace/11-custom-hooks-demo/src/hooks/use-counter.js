import { useEffect, useState } from 'react';

/*
    Cuustom hook name MUST start with 'use' word.
    The word 'use' signals to react that it will be a custom hook 
    and it gives react the guarantee that you will use that function by respecting the "rules of hooks"
    So you will use this custom hook function just as you use to built-in hooks.
*/
const useCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
};

export default useCounter;

import { useState } from 'react';

/*
    Custom hook name MUST start with 'use' word.
    The word 'use' signals to react that it will be a custom hook 
    and it gives react the guarantee that you will use that function by respecting the "rules of hooks"
    So you will use this custom hook function just as you use to built-in hooks.

    Custom Hook function can accept parameters just like built-in hooks.
*/
const useHttp = (requestConfig, applyDataCallback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url,
        //'https://react-http-dba8a-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
        {
          method: requestConfig.method,
          headers: requestConfig.headers,
          body: JSON.stringify(requestConfig.body),
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      // call the callback
      applyDataCallback(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  // return to the component
  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;

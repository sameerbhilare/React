import { useReducer, useState } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (prevState, action) => {
  if (action.type === 'INPUT_CHANGE') {
    return { value: action.value, isTouched: prevState.isTouched };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: prevState.value, isTouched: true };
  }

  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }

  // default state
  return initialInputState;
};

// Custom Hook with useReducer()
const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

  // DERIVED STATE
  // on every change in 'enteredName' state, this component function runs
  // so we can derive aonther state 'enteredNameIsValid' from entered input
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT_CHANGE', value: event.target.value });
  };

  const valueBlurHandler = (event) => {
    dispatch({ type: 'INPUT_BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler, // expose the handlers to outside where this hook is used
    valueBlurHandler,
    reset,
  };
};

// *************************************************************************
// Custom Hook with - useState()
/*
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  // DERIVED STATE
  // on every change in 'enteredName' state, this component function runs
  // so we can derive aonther state 'enteredNameIsValid' from entered input
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler, // expose the handlers to outside where this hook is used
    valueBlurHandler,
    reset,
  };
};
*/
export default useInput;

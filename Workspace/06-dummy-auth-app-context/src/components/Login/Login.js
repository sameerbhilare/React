import React, { useContext, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

/*
  This reducer function is written outside of the component function. 
  because inside of this reducer function, we won't need any data that's generated inside of the component function.
  So this reducer function can be created outside of the scope of the component function
  as it doesn't need to interact with anything defined inside of the component function.

  All the data which will be required and used inside of the reducer function 
  will be passed into this function when it's executed by React, automatically.
*/
// 'state' - is last state snapshot
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    // return new state
    return { value: action.val, isValid: action.val.includes('@') };
  }

  if (action.type === 'INPUT_BLUR') {
    // return new state
    // value should be prev state value
    return { value: state.value, isValid: state.value.includes('@') };
  }

  // return new state
  return { value: '', isValid: false };
};

// 'state' - is last state snapshot
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    // return new state
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === 'INPUT_BLUR') {
    // return new state
    // value should be prev state value
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  // return new state
  return { value: '', isValid: false };
};

const Login = (props) => {
  const authCtx = useContext(AuthContext);

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // 'useReducer' for combined state of email value and email validity
  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    // initial state
    { value: '', isValid: undefined }
  );

  // 'useReducer' for combined state of password value and password validity
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    // initial state
    { value: '', isValid: undefined }
  );

  // using object destructuring to get specific fields and providing then alias
  // advantage is the useEffect will run only when validity changes, not when value changes. so better OPTIMIZATION
  const { isValid: isEmailValid } = emailState;
  const { isValid: isPasswordValid } = passwordState;
  /*
    Handling (Side) Effects with useEffect React hook.
    Whenever you have an action that should be executed in response to some other action, that is a "side effect".
    useEffect() will get called whenever this App component is evaluated/(reevaluated due any state changes)
    However the function inside it (1st argument) will execute ONLY if the dependencies (2nd arg) are changed
  */
  useEffect(
    /*
        IMPLEMENTING DEBOUNCE TIME - to avoid setTimeout function execution for each key stroke
        The idea is to wait for 500 ms. 
        If user doesn't type anthing for 500 ms, then only setTimeout function executes. Otherwise the timeout will be cleared in the cleanup function below
      */

    // side-effect function (1st arg)
    () => {
      const identifier = setTimeout(() => {
        console.log('checking form validity');
        setFormIsValid(isEmailValid && isPasswordValid);
      }, 500);

      // returning 'Cleanup function'
      // This returned function will run as a cleanup process before useEffect executes this function the next time.
      // In addition, this cleanup function will run whenever
      // the component you're specifying the effect in unmounts from the DOM. So whenever the component is removed.
      // it will not run for the first side-effect execution (obviously).
      return () => {
        console.log('CLEANUP');
        clearTimeout(identifier);
      };
    },
    // dependencies (2nd arg)
    [isEmailValid, isPasswordValid]
  );

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);

    // calling dispatchEmail with 'action'to perform
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    /*
    RULE VIOLATION: Here we are setting one state (formIsValid) based on other states (enteredPassword)
    We should change a state based on its own previous state
    If you update a state, which depends on another state, then merging this into one state could be a good idea.
    In such cases we can use useState with an object but that can become complex, so use useReducer
    */
    //setFormIsValid(event.target.value.includes('@') && enteredPassword.trim().length > 6);

    // PROPER WAY: using useReducer
    //setFormIsValid(event.target.value.includes('@') && passwordState.value.trim().length > 6);

    // BEST WAY: using useEffect above
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    // calling dispatchPassword with 'action'to perform
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

    /*
    RULE VIOLATION: Here we are setting one state (formIsValid) based on other states (enteredEmail)
    We should change a state based on its own previous state.
    If you update a state, which depends on another state, then merging this into one state could be a good idea.
    In such cases we can use useState with an object but that can become complex, so use useReducer
    */
    //setFormIsValid(event.target.value.trim().length > 6 && enteredEmail.includes('@'));

    // PROPER WAY: using useReducer
    //setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);

    // BEST WAY: using useEffect above
  };

  const validateEmailHandler = () => {
    /*
    RULE VIOLATION: Here we are setting one state (emailIsValid) based on other states (enteredEmail)
    We should change a state based on its own previous state
    If you update a state, which depends on another state, then merging this into one state could be a good idea.
    In such cases we can use useState with an object but that can become complex, so use useReducer
    */
    //setEmailIsValid(enteredEmail.includes('@'));

    // PROPER WAY: using useReducer
    // calling dispatchEmail with 'action'to perform
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    /*
    RULE VIOLATION: Here we are setting one state (passwordIsValid) based on other states (enteredPassword)
    We should change a state based on its own previous state
    If you update a state, which depends on another state, then merging this into one state could be a good idea.
    In such cases we can use useState with an object but that can become complex, so use useReducer
    */
    //setPasswordIsValid(enteredPassword.trim().length > 6);

    // PROPER WAY: using useReducer
    // calling dispatchPassword with 'action'to perform
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

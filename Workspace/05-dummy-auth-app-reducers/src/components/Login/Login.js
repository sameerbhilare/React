import React, { useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

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
    setFormIsValid(event.target.value.includes('@') && passwordState.value.trim().length > 6);
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
    setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
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
    props.onLogin(emailState.value, passwordState.value);
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

import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect without dependencies so it will run for every component run cycle
  useEffect(() => {
    //console.log('Effect running!');
  });

  // useEffect with empty dependencies so it will run only once when the component is loaded for the first time
  useEffect(() => {
    console.log('Effect running once only !');
  }, []);

  /*
    Handling (Side) Effects with useEffect React hook.
    Whenever you have an action that should be executed in response to some other action, that is a "side effect".
    useEffect() will get called whenever this App component is evaluated/(reevaluated due any state changes)
    However the function inside it (1st argument) will execute ONLY if the dependencies (2nd arg) are changed

    We want to call setFormIsValid() only if the email or password fields are changed (side effect of user entering some data)
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
        setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
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
    [enteredEmail, enteredPassword]
  );

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''}`}>
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''}`}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={enteredPassword}
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

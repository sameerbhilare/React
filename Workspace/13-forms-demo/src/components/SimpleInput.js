import { useState } from 'react';

const SimpleInput = (props) => {
  // approach 1 - using state and onChange event
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  // DERIVED STATE
  // on every change in 'enteredName' state, this component function runs
  // so we can derive aonther state 'enteredNameIsValid' from entered input
  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputInvalid = !enteredNameIsValid && enteredNameTouched;

  const enteredEmailIsValid = enteredEmail.trim().includes('@');
  const emailInputInvalid = !enteredEmailIsValid && enteredEmailTouched;

  // checking overall form validity
  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  // this function is recreted on every component evaluations
  const formSubmissionHandler = (event) => {
    event.preventDefault(); // imp

    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

    // basic validation
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log({ enteredName, enteredEmail });

    // reseting form
    setEnteredName('');
    setEnteredEmail('');
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputInvalid ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputInvalid && <p className='error-text'>Name must not be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='email'
          id='email'
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputInvalid && <p className='error-text'>Email must not be empty.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

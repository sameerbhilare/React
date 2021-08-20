import { useState } from 'react';

const SimpleInput = (props) => {
  // approach 1 - using state and onChange event
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // DERIVED STATE
  // on every change in 'enteredName' state, this component function runs
  // so we can derive aonther state 'enteredNameIsValid' from entered input
  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  // this function is recreted on every component evaluations
  const formSubmissionHandler = (event) => {
    event.preventDefault(); // imp

    setEnteredNameTouched(true);

    // basic validation
    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    // reseting form
    setEnteredName('');
    setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputInvalid ? 'form-control invalid' : 'form-control';

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
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

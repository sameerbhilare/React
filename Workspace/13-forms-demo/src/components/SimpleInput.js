import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  // approach 1 - using state and onChange event
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // approach 2 - using ref
  const nameInputRef = useRef();

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    // IMP - we must NOT use 'enteredName' here bcz as we know React schedules above state update
    // and latest state will not be immediately available on below line
    if (event.target.value.trim() !== '') {
      setEnteredNameIsValid(true);
    }
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);

    // basic validation
    if (enteredName.trim().length === 0) {
      setEnteredNameIsValid(false);
    }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault(); // imp

    setEnteredNameTouched(true);

    // basic validation
    if (enteredName.trim().length === 0) {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    console.log(enteredName);
    console.log(nameInputRef.current.value);

    // reseting form
    setEnteredName('');
    //nameInputRef.current.value = ''; // this is not ideal bcz React should handle DOM manipulation.
  };

  const nameInputInvalid = !enteredNameIsValid && enteredNameTouched;
  const nameInputClasses = nameInputInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
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

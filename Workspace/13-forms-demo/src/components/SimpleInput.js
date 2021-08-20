import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  // approach 1 - using state and onChange event
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  // approach 2 - using ref
  const nameInputRef = useRef();

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault(); // imp

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

  const nameInputClasses = enteredNameIsValid ? 'form-control' : 'form-control invalid';

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
        />
        {!enteredNameIsValid && <p className='error-text'>Name must not be empty.</p>}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

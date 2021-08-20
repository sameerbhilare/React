import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  // approach 1 - using state and onChange event
  const [enteredName, setEnteredName] = useState('');

  // approach 2 - using ref
  const nameInputRef = useRef();

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault(); // imp

    // basic validation
    if (enteredName.trim().length === 0) {
      return;
    }

    console.log(enteredName);
    console.log(nameInputRef.current.value);

    // reseting form
    setEnteredName('');
    nameInputRef.current.value = ''; // this is not ideal bcz React should handle DOM manipulation.
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
          type='text'
          id='name'
          value={enteredName}
          onChange={nameInputChangeHandler}
        />
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

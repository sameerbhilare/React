// below import of 'React' is optional in latest versions of React.
// It is used under the hood when we use JSX code
/* 'useState' function allows us to define values as state
    where changes to these values should reflect in the component function being called again
   'useState' is a React Hook. React Hooks start with the word "use" in their name, 
    and all these hooks must only be called DIRECTLY inside of React component functions. (not inside nested function of component function) */
import React, { useState } from 'react';

// make the React nuild process aware that this .css should be used for this component
import './ExpenseForm.css';

// A component in React is just a JavaScript function
/* React will pass a single object to our component function which will hold all passed-in parameters
   with key as the name of the attribute and value as its value.
   You can name it anything, but typically it is named as 'props'
*/
const ExpenseForm = (props) => {
  // invoking react hook
  // useState always returns an array of exactly 2 elements.
  // Name of the 'state' and a function to change value of that property
  // Multiple States are managed independantly
  // no matter how many times this component function gets called for once instance of a component, the state will not be reset due to useState()
  const [enteredTitle, setEnteredTitle] = useState(''); // initial state
  const [enteredAmount, setEnteredAmount] = useState(''); // initial state
  const [enteredDate, setEnteredDate] = useState(''); // initial state

  // one state vs multiple states
  /*
  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
  });*/

  // handler
  const titleChangeHandler = (event) => {
    // we cannot use enteredTitle = event.target.value, we haveto use setTitle function because
    // calling setEnteredTitle() will not only update value of 'title' BUT ALSO it will execute this component function again!
    setEnteredTitle(event.target.value);
    // IMP - At this point, the updated title will NOT be available bcz setTitle will 'schedule' the update, but eventually it will get updated.
    //console.log(title);

    // one state for 3 inputs
    // below is not correct way because we depend on prevous State.
    /*
    setUserInput({
      ...userInput, // prev state
      enteredTitle: event.target.value,
    });*/

    // better way when we depend on previous State is to use inner function for which React passes LATEST previous State
    /*
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    });*/
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);

    // one state for 3 inputs
    // below is not correct way because we depend on prevous State.
    /*
    setUserInput({
      ...userInput, // prev state
      enteredAmount: event.target.value,
    });*/

    // better way when we depend on previous State is to use inner function for which React passes LATEST previous State
    /*
    setUserInput((prevState) => {
      return { ...prevState, enteredAmount: event.target.value };
    });*/
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);

    // one state for 3 inputs
    // below is not correct way because we depend on prevous State.
    /*
    setUserInput({
      ...userInput, // prev state
      enteredDate: event.target.value,
    }); */

    // better way when we depend on previous State is to use inner function for which React passes LATEST previous State
    /*
    setUserInput((prevState) => {
      return { ...prevState, enteredDate: event.target.value };
    });*/
  };

  const submitHandler = (event) => {
    event.preventDefault(); // to prevent page submission

    // combine State data
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    // call the event handler (communicate to parent)
    props.onSaveExpenseData(expenseData);

    // reset form
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input type='text' value={enteredTitle} onChange={titleChangeHandler} />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input
            type='number'
            value={enteredAmount}
            min='0.01'
            step='0.01'
            onChange={amountChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            value={enteredDate}
            min='2019-01-01'
            max='2022-12-31'
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;

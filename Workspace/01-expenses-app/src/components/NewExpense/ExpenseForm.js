// below import of 'React' is optional in latest versions of React.
// It is used under the hood when we use JSX code
import React from 'react';

// make the React nuild process aware that this .css should be used for this component
import './ExpenseForm.css';

// A component in React is just a JavaScript function
/* React will pass a single object to our component function which will hold all passed-in parameters
   with key as the name of the attribute and value as its value.
   You can name it anything, but typically it is named as 'props'
*/
const ExpenseForm = () => {
  return (
    <form>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input type='text' />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input type='number' min='0.01' step='0.01' />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input type='date' min='2019-01-01' max='2022-12-31' />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;

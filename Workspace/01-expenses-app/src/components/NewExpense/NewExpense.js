// below import of 'React' is optional in latest versions of React.
// It is used under the hood when we use JSX code
import React from 'react';

import ExpenseForm from './ExpenseForm';
// make the React nuild process aware that this .css should be used for this component
import './NewExpense.css';

// A component in React is just a JavaScript function
/* React will pass a single object to our component function which will hold all passed-in parameters
   with key as the name of the attribute and value as its value.
   You can name it anything, but typically it is named as 'props'
*/
const NewExpense = (props) => {
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = { ...enteredExpenseData, id: Math.random().toString() };
    console.log('NewExpense', expenseData);

    // call the event handler (communicate to parent)
    props.onAddExpense(expenseData);
  };

  return (
    <div className='new-expense'>
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
};

export default NewExpense;

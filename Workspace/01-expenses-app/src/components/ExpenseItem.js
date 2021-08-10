// make the React nuild process aware that this .css should be used for this component
import './ExpenseItem.css';

// A component in React is just a JavaScript function
function ExpenseItem() {
  const expenseDate = new Date(2021, 9, 10);
  const expenseTitle = 'Order Food';
  const expenseAmount = 100;

  // JSX - must return JSX code with only one root element.
  // Inside of that root element, we can have many adjacent elements
  return (
    <div className='expense-item'>
      <div>{expenseDate.toISOString()}</div>
      <div className='expense-item__description'>
        <h2>{expenseTitle}</h2>
        <div className='expense-item__price'>${expenseAmount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;

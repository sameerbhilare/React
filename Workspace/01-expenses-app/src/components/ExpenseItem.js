// make the React nuild process aware that this .css should be used for this component
import './ExpenseItem.css';

// A component in React is just a JavaScript function
function ExpenseItem() {
  // JSX - must return JSX code with only one root element.
  // Inside of that root element, we can have many adjacent elements
  return (
    <div className='expense-item'>
      <div>Aug 10th 2021</div>
      <div className='expense-item__description'>
        <h2>Order Food</h2>
        <div className='expense-item__price'>$100</div>
      </div>
    </div>
  );
}

export default ExpenseItem;

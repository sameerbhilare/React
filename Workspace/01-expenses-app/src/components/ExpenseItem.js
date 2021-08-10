import ExpenseDate from './ExpenseDate';
// make the React nuild process aware that this .css should be used for this component
import './ExpenseItem.css';

// A component in React is just a JavaScript function
/* React will pass a single object to our component function which will hold all passed-in parameters
   with key as the name of the attribute and value as its value.
   You can name it anything, but typically it is named as 'props'
*/
function ExpenseItem(props) {
  // JSX - must return JSX code with only one root element.
  // Inside of that root element, we can have many adjacent elements
  return (
    <div className='expense-item'>
      {/* using nested custom component */}
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{props.title}</h2>
        <div className='expense-item__price'>${props.amount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;

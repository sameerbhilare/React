// below import of 'React' is optional in latest versions of React.
// It is used under the hood when we use JSX code
import React from 'react';

import Card from '../UI/Card';
import ExpenseDate from './ExpenseDate';
// make the React nuild process aware that this .css should be used for this component
import './ExpenseItem.css';

// A component in React is just a JavaScript function
/* React will pass a single object to our component function which will hold all passed-in parameters
   with key as the name of the attribute and value as its value.
   You can name it anything, but typically it is named as 'props'
*/
const ExpenseItem = (props) => {
  // button click handler
  const clickHandler = () => {
    console.log('clicked!');
  };

  // JSX - must return JSX code with only one root element. (bcz React.createElement() expects only one element)
  // Inside of that root element, we can have many adjacent elements
  return (
    <Card className='expense-item'>
      {/* using nested custom component */}
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{props.title}</h2>
        <div className='expense-item__price'>${props.amount}</div>
        <button onClick={clickHandler}>Change Title</button>
      </div>
    </Card>
  );
};

export default ExpenseItem;

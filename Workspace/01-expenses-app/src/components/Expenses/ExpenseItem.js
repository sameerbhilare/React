// below import of 'React' is optional in latest versions of React.
// It is used under the hood when we use JSX code
// 'React' is default import
/* 'useState' function allows us to define values as state
    where changes to these values should reflect in the component function being called again
   'useState' is a React Hook. React Hooks start with the word "use" in their name, 
    and all these hooks must only be called DIRECTLY inside of React component functions. (not inside nested function of component function) */
import React, { useState } from 'react';

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
  // invoking react hook
  // useState always returns an array of exactly 2 elements.
  // Name of the 'state' and a function to change value of that property
  const [title, setTitle] = useState(props.title);
  console.log('ExpenseItem component function execuated!');

  // button click handler
  const clickHandler = () => {
    // we cannot use title = 'Updated!', we haveto use setTitle function because
    // calling setTitle() will not only update value of 'title' BUT ALSO it will execute this component function again!
    setTitle('Updated!');
    // IMP - At this point, the updated title will NOT be available bcz setTitle will 'schedule' the update, but eventually it will get updated.
    //console.log(title);

    console.log('clicked!');
  };

  // JSX - must return JSX code with only one root element. (bcz React.createElement() expects only one element)
  // Inside of that root element, we can have many adjacent elements
  return (
    <Card className='expense-item'>
      {/* using nested custom component */}
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{title}</h2>
        <div className='expense-item__price'>${props.amount}</div>
        <button onClick={clickHandler}>Change Title</button>
      </div>
    </Card>
  );
};

export default ExpenseItem;

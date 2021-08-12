// below import of 'React' is optional in latest versions of React.
// It is used under the hood when we use JSX code
import React from 'react';
import ExpenseItem from './ExpenseItem';

// make the React nuild process aware that this .css should be used for this component
import './ExpensesList.css';

const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>No expenses found!</h2>;
  }

  return (
    <ul className='expenses-list'>
      {props.items.map((expense) => (
        /*If you add the 'key' to your component or HTML element with unique value,
            then you can help React identify the individual items.
            So that React will efficiently perform the rendering and DOM manipulations
            and it will also avoid potential 'state' as well as rendering performance issues in below components */
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;

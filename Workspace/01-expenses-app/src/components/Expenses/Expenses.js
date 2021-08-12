// below import of 'React' is optional in latest versions of React.
// It is used under the hood when we use JSX code
import React, { useState } from 'react';

import Card from '../UI/Card';
import ExpenseItem from './ExpenseItem';
// make the React nuild process aware that this .css should be used for this component
import './Expenses.css';
import ExpensesFilter from './ExpensesFilter';

// A component in React is just a JavaScript function
/* React will pass a single object to our component function which will hold all passed-in parameters
   with key as the name of the attribute and value as its value.
   You can name it anything, but typically it is named as 'props'
*/
/*
  *************************************** IMP ***************************************
  This component is a "stateful" component also called "smart" component 
  because it has some internal state. e.g. 'filterYear'
  ***********************************************************************************
*/
const Expenses = (props) => {
  // storing the state so that we can pass to othe components
  const [filterYear, setFilterYear] = useState('2021');

  const filterChangeHandler = (filterYear) => {
    console.log(filterYear);
    setFilterYear(filterYear);
  };

  const filteredExpenses = props.items.filter(
    (expense) => expense.date.getFullYear() === +filterYear
  );

  // JSX (JavaScript XML)
  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter selected={filterYear} onFilterChange={filterChangeHandler} />
        {/* using plain Array map() method to render our components */}
        {filteredExpenses.length === 0 ? (
          <p>No expenses found!</p>
        ) : (
          filteredExpenses.map((expense) => (
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
          ))
        )}
      </Card>
    </div>
  );
};

export default Expenses;

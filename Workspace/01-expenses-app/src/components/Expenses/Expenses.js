// below import of 'React' is optional in latest versions of React.
// It is used under the hood when we use JSX code
import React, { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
// make the React nuild process aware that this .css should be used for this component
import './Expenses.css';

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
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;

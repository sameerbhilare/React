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

  // JSX (JavaScript XML)
  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter selected={filterYear} onFilterChange={filterChangeHandler} />
        <ExpenseItem
          title={props.items[0].title}
          amount={props.items[0].amount}
          date={props.items[0].date}
        ></ExpenseItem>
        <ExpenseItem
          title={props.items[1].title}
          amount={props.items[1].amount}
          date={props.items[1].date}
        ></ExpenseItem>
        <ExpenseItem
          title={props.items[2].title}
          amount={props.items[2].amount}
          date={props.items[2].date}
        ></ExpenseItem>
        <ExpenseItem
          title={props.items[3].title}
          amount={props.items[3].amount}
          date={props.items[3].date}
        ></ExpenseItem>
      </Card>
    </div>
  );
};

export default Expenses;

// below import of 'React' is optional in latest versions of React.
// It is used under the hood when we use JSX code
import React, { useState } from 'react';

import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const App = () => {
  // storing the state so that we can pass to othe components
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    console.log('In App.js', expense);
    setExpenses((prevExpenses) => {
      // expense first then array bcz we want latest expense at the top
      return [expense, ...prevExpenses];
    });
  };

  // JSX (JavaScript XML)
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );

  // Under the hood, above code is transformed into below which is then transformed to browser understandable code
  /*
  return React.createElement(
    'div',
    {},
    React.createElement('h2', {}, "Let's get started!"),
    React.createElement(Expenses, { items: expenses })
  );*/
};

export default App;

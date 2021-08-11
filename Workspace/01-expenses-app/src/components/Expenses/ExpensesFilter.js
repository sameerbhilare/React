import React from 'react';

import './ExpensesFilter.css';

/*
    *************************************** IMP ***************************************
    ExpensesFilter is a "Controlled component" which simply means that 
    both the value, as well as changes to the value are not handled in the component itself but in a parent component.
    So here the dropdown receives value from parent component (Expenses.js) 
    and passed user selected value (onChange) to the parent component (Expenses.js )

    So Expenses.js component 'controls' ExpensesFilter component.
    ***********************************************************************************
*/
const ExpensesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onFilterChange(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>
        <select onChange={dropdownChangeHandler} value={props.selected}>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;

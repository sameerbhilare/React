import React, { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';

import styles from './AddUser.module.css'; // CSS Module

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({ title: 'Invalid Input', message: 'Please enter valid Username and Age!' });
      return;
    }

    // convert to number
    if (+enteredAge < 1) {
      setError({ title: 'Invalid Age', message: 'Please enter valid Age!' });
      return;
    }

    const newUser = { name: enteredUsername, age: enteredAge, id: Math.random().toString() };
    console.log(newUser);
    // lift the state up (to parent)
    props.onAddUser(newUser);

    // reset the form
    setEnteredUsername('');
    setEnteredAge('');
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const dismissModalHandler = (event) => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal title={error.title} message={error.message} onDismiss={dismissModalHandler} />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />

          <label htmlFor='age'>Age (Years)</label>
          <input id='age' type='number' value={enteredAge} onChange={ageChangeHandler} />

          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;

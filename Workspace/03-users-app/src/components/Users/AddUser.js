import React, { useRef, useState } from 'react';
import Wrapper from '../Helpers/Wrapper';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';

import styles from './AddUser.module.css'; // CSS Module

const AddUser = (props) => {
  /*
    Refs allow us to get access to other DOM elements and work with them.
    With refs, we can set up a connection between a HTML element which is being rendered in the end and our other JavaScript code.

    The first time React reaches this code and renders the element, 
    it will actually set the values stored in 'nameInputRef' to the native DOM element that is rendered based on this input.
    What will end up inside of 'nameInputRef' in the end will really be a real DOM element later.

    When you want to just read values, use Refs.
    If you want to read/write values, use State
  */
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({ title: 'Invalid Input', message: 'Please enter valid Username and Age!' });
      return;
    }

    // convert to number
    if (+enteredUserAge < 1) {
      setError({ title: 'Invalid Age', message: 'Please enter valid Age!' });
      return;
    }

    const newUser = { name: enteredName, age: enteredUserAge, id: Math.random().toString() };
    console.log(newUser);
    // lift the state up (to parent)
    props.onAddUser(newUser);

    // we should not manupulate DOM directly, instead let React react do it for you.
    // However in case of input elements, it is okay to do so. e.g. resetting form
    // Bottom line: Rarely use Refs to manipulate the DOM **************
    nameInputRef.current.value = ''; // ****
    ageInputRef.current.value = ''; // ****
  };

  const dismissModalHandler = (event) => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal title={error.title} message={error.message} onDismiss={dismissModalHandler} />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input id='username' type='text' ref={nameInputRef} />

          <label htmlFor='age'>Age (Years)</label>
          <input id='age' type='number' ref={ageInputRef} />

          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;

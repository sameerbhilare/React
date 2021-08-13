import React, { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UserList from './components/Users/UserList';

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (addedUser) => {
    setUsersList((prevUsersList) => {
      return [addedUser, ...prevUsersList];
    });
  };

  // <> simply is wrapper provided by React - called Fragment. <> is same as <React.Fragment>
  return (
    <>
      <AddUser onAddUser={addUserHandler} />
      <UserList users={usersList} />
    </>
  );

  /*
  return (
    <React.Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UserList users={usersList} />
    </React.Fragment>
  );*/
}

export default App;

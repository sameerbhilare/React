import React, { useEffect, useState } from 'react';

/*
    React.createContext() creates React context object.
    React context is for application wide state management.
    Here 'AuthContext' is not a component, but which holds components.

    There are 2 steps once a React Context is created  -
    1. Provide using 'Provider'
    2. Listen using 'Consumer' or using React Hook useContext()
*/
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

// creating custom provider component to manage entire authentication state
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*
    Handling (Side) Effects with useEffect React hook.
    useEffect() will get called whenever this App component is evaluated/(reevaluated due any state changes)
    However the function inside it (1st argument) will execute ONLY if the dependencies (2nd arg) are changed

    Here the function (1st arg) will run only once when the app starts (or page refreshed from browser).
    bcz at the start the dependencies (2nd arg) will be new so it will execute the function (1st arg).
    On future evaluations of this App component, this App component function will run 
    but then the useEffect function (1st arg) will NOT run bcz the dependencies (2nd arg) are not changed.
  */
  useEffect(() => {
    const storedUserLoginInfo = localStorage.getItem('isLoggedIn');
    if (storedUserLoginInfo === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
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

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      {/*
        AuthContext provider is a component we can use in our JSX code, 
        and we can wrap it around other components and those other components and all their descendant components
        (So all their children and their children's children and so on,) 
        all those components will now have access to that Context.
       */}
      <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
        <MainHeader onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;

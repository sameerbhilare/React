import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

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
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;

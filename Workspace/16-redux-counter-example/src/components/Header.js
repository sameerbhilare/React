import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import classes from './Header.module.css';

const Header = () => {
  // accessing the state Auth slice
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // 'auth' is key name used in configureStore -> reducer property in index.js

  const dispatch = useDispatch();

  const logoutHandler = () => {
    // dispatchign actions to state Auth slice
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuthenticated && (
        <nav>
          <ul>
            <li>
              <a href='/'>My Products</a>
            </li>
            <li>
              <a href='/'>My Sales</a>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

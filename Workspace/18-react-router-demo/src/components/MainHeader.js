import { Link, NavLink } from 'react-router-dom';

import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            {/* 
              Internally react router will actually listen to clicks on those links, 
              prevent the browser default and instead manually update the URL for us 
              so that it looks like if we switched the page 
              and it will then also change what we see on the screen. 

              Link and NavLink are same. However in addition to above mentioned tasks
              NavLink also will set a CSS class on the active anchor item.
              We just need to tell NavLink, which class to add, by adding the activeClassName prop.
              */}
            <NavLink activeClassName={classes.active} to='/welcome'>
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to='/products'>
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;

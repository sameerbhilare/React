import React from 'react';

// importing the styles
import styles from './Header.module.css';

// importing the image and using it
import mealsImage from '../../assets/meals.jpg';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <button>Card</button>
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </React.Fragment>
  );
};

export default Header;

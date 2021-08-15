import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart.context';

import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);

  const numberOfCartItems = items.reduce((currNumber, item) => currNumber + item.amount, 0);

  const btnClasses = `${styles.button} ${isBtnHighlighted ? styles.bump : ''}`;

  // using useEffect to show bump animation on every cart item change
  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    // set to tru so that 'bump' css class will be added
    setIsBtnHighlighted(true);

    const timer = setTimeout(() => {
      // set to tru so that 'bump' css class will be removed after 300 ms (after animation plays)
      setIsBtnHighlighted(false);
    }, 300);

    // cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

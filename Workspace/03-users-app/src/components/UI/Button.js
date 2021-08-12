import React from 'react';

import styles from './Button.module.css'; // using CSS Modules

const Button = (props) => {
  return (
    <button className={styles.button} type={props.type || 'button'} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;

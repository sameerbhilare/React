import React from 'react';

import styles from './Input.module.css';

const Input = (props) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* TRICK: {...props.input} means all key value pairs received on props.input will be placed here 
        e.g. if 'props.input' is {type: 'text'} => it will be rendered as type='text' below
      */}
      <input {...props.input} />
    </div>
  );
};

export default Input;

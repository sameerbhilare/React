import React, { useRef, useImperativeHandle } from 'react';
// 'useImperativeHandle' should be rarely used

import styles from './Input.module.css';

/*
    ***********************************************************************************
    With the useImperativeHandle and React.forwardRef(), you can expose functionalities 
    from a React Component to its parent Component to then use your Component 
    in the parent Component through refs and trigger certain functionalities.

    You should avoid using it 
    but in cases like input focusing, scrolling and so on this can be very useful
    and then triggering something like this programmatically is fine.
    ***********************************************************************************
*/

// Component function also receives 2nd arg which is 'ref'
// Here Input still is a React Component but a React Component that is capable of being bound to a 'ref'.
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    // return translational obj between internal functionalities and external references
    return {
      // external name : internal name
      focus: activate,
    };
  });

  return (
    <div className={`${styles.control} ${props.isValid === false ? styles.invalid : ''}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        ref={inputRef}
      />
    </div>
  );
});

export default Input;

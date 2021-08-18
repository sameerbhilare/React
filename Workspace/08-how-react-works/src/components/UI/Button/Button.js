import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  console.log('Button RUNNING');
  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

/*
  Here using React.memo() doesnot have any effect.
  This Button component will be rendered always 
  because this component receives a function handler as one of the props (props.onClick)
  And since react does === comparison so 2 different objects are never ====.

  Solution to this problem is to use useCallback() in parent for that function handler
  useCallback() is a hook that allows React to basically store a function across component executions.
  So it tells React that this function should not be recreated.

with every execution.
  hence === check passes and React.memo() will work as intended.
*/
export default React.memo(Button);

import React from 'react';
//import styled from 'styled-components';

/*
  This is basically a signal to the underlying React compilation process
  to transform to code so that CSS Modules work.
  The build process under the hood just takes those CSS classes and a CSS file
  and basically changes those class names to be unique
  so that those styles are 'scoped' to a component we import this file into.
  We then access those CSS classes from the imported file as properties on the imported 'styles' object.
*/
import styles from './Button.module.css'; // the name of the CSS Module file must end with '.module.css'

//import './Button.css';

// tagged template literal - is a JS feature
// what we pass in the `` is passed as an input to the method 'button' of object 'styled'
// By default all the styles in .css files are available across the application,
// which might cause some conflicts andundesired behavior
// 'styled-components' package allows us to apply styles only to given component.
/*
const Button = styled.button`
  width: 100%;
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;

  @media (min-width: 768px) {
    width: auto;
  }

  &:focus {
    outline: none;
  }

  &:hover,
  &:active {
    background: #ac0e77;
    border-color: #ac0e77;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
  }
`;
*/

// const Button = props => {
//   return (
//     <button type={props.type} className="button" onClick={props.onClick}>
//       {props.children}
//     </button>
//   );
// };

const Button = (props) => {
  // access CSS classes from the imported file as properties on the imported 'styles' object.
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;

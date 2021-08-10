// below import of 'React' is optional in latest versions of React.
// It is used under the hood when we use JSX code
import React from 'react';

import './Card.css';

// The purpose of this Card component is to just as a wrapper/container for other components and common stylings
const Card = (props) => {
  // appending any received class names to our custom component
  const classes = 'card ' + props.className;

  // 'children' is a reserved prop which every component receives
  // and its value is the content between opening and closing tags of this custom element. so <Card>CONTENT</Card>
  return <div className={classes}>{props.children}</div>;
};

export default Card;

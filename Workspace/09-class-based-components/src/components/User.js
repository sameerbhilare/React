import { Component } from 'react';

import classes from './User.module.css';

/* 
  Need to extend the class with React's Component class.
  This Component class adds important functionality to make your class work as a component.
  And it also adds a couple of important properties For example, the 'props' property 
  which can be accessed as 'this.props....'

  Class-based components can work together with functional components.
*/
class User extends Component {
  /*
    Called right before component is unmounted (removed from DOM)
    Similar to clean up function from useEffect. useEffect(() => { return () => {…}}, [])
  */
  componentWillUnmount() {
    console.log('User will unmount!');
  }

  /*
    The method name has to be 'render()' in class-based components.
    render() method in a class is your equivalent to the return statement in a functional component
  */
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;

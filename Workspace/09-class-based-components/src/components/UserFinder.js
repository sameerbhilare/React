import { Fragment, useState, useEffect, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';

class UserFinder extends Component {
  /*
    Using context -
    With belowline you're telling React this component should have access to the UsersContext context,
    but you can only set the static context type property once 
    so if there are two contexts which should be connected to one at the same component, 
    this would simply not be an option. You would have to find some other work around 
    like wrapping it in a number component or anything like that.
  */
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    };
  }

  /*
    Called once component mounted (was evaluated & rendered)
    Similar to useEffect(…, []) // with empty dependencies
  */
  componentDidMount() {
    // Send http request...
    this.setState({ filteredUsers: this.context.users }); // using the context via 'this.context'
  }

  /*
    Called once component updated (was evaluated & rendered)
    Similar to useEffect(…, [someValue]) // with some dependencies

    componentDidUpdate receives 2 args. previous properties and previuos state
  */
  componentDidUpdate(prevProps, prevState) {
    // if check to avoid infinite loop
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        {/* Wrapping Users component by ErrorBoundary*/}
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;

import { Component } from 'react';

/*
  The error boundary component is a regular class-based component,
  but it is a class-based component which implements the componentDidCatch lifecycle method.

  The idea behind error boundaries really is that you can ensure that not your entire application crashes 
  if something goes wrong, but that instead you can catch those errors and then handle them in an elegant way,
  just as you would do it with try catch in regular JavaScript.
*/
class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false }; // initial error state
  }

  /*
    The componentDidCatch() lifecycle method can be added to any class-based component,
    and whenever you do add it to a class-based component, 
    it makes that class-based component an error boundary.

    You can't add it to functional components, 
    and there is no equivalent for functional components at the moment.

    This lifecycle method will be triggered whenever one of the child components 
    throws an error or generates an error.

    We get error object automatically passed by React.
  */
  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true }); // setting error state
  }

  render() {
    // using error state
    if (this.state.hasError) {
      return <p>Something went wrong!</p>;
    }
    /*
       return this.props.children because 
       we want to wrap our error boundary component around components 
       which should be protected by that component.
       Refer UserFinder.js where we have wrapped <Users> component by <ErrorBoundary>
    */
    return this.props.children;
  }
}

export default ErrorBoundary;

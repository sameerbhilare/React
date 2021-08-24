import { Route } from 'react-router-dom';

// Regular component but used as a page based on URL, hence kept in pages folder
const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      {/* Nested Routes. */}
      <Route path='/welcome/new-user'>
        <p>Welcome new user</p>
      </Route>
    </section>
  );
};

export default Welcome;

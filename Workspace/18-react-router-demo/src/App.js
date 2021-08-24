import { Route } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import Products from './pages/Products';
import Welcome from './pages/Welcome';

function App() {
  /*
    Route is a component that allows us to define a certain path 
    and then the React component that should be loaded when that path becomes active in the URL.
  */

  return (
    <div>
      <MainHeader />
      <main>
        {/* Route is a component that allows us to define a certain path 
          and then the React component that should be loaded when that path becomes active in the URL.

          Below Route component will make sure that this 'Welcome' component is only displayed on the screen 
          if our URL path is /welcome
        */}
        <Route path='/welcome'>
          <Welcome />
        </Route>
        <Route path='/products'>
          <Products />
        </Route>
      </main>
    </div>
  );
}

export default App;

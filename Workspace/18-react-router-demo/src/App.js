import { Route, Switch } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import ProductDetail from './pages/ProductDetail';
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
        {/* With <Switch> component, only first matching route will be loaded.
          This will also consider if a route has a property called 'exact'.
         */}
        <Switch>
          {/* Route is a component that allows us to define a certain path 
          and then the React component that should be loaded when that path becomes active in the URL.

          Below Route component will make sure that this 'Welcome' component is only displayed on the screen 
          if our URL path is /welcome

          By default (without <Switch>), the routes are not parsed such that only one of them is loaded at the same time.
          But instead all routes that match (not exact match) the current path will be loaded.
        */}
          <Route path='/welcome'>
            <Welcome />
          </Route>
          <Route path='/products' exact>
            <Products />
          </Route>
          {/* Dynamic Path */}
          <Route path='/products/:productId'>
            <ProductDetail />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;

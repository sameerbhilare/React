import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  /*
    Listen to all state changes and if something changes sync it with backend.
    
    useEffect to watch for changes in the cart state and sync it with backend.
    because useEffect allows you to run side effects whenever some dependency changes.

    This can be done in any component, but we are doing it here in App component.
    
    Have side effect logic in a component and keep all our data transformation logic inside of a Reducer.
    "Lean Component & Fat Reducers"
  */
  useEffect(() => {
    // no need to await the response here as we are not interested in the response
    fetch('https://react-http-dba8a-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
      method: 'PUT', // to override existing data
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

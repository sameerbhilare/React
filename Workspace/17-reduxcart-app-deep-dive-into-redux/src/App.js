import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slice';

// this will be initialized only once. Doesn't get reinitialized on 'App' component reevaluation
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  const notification = useSelector((state) => state.ui.notification);

  /*
    Listen to all state changes and if something changes sync it with backend.
    
    useEffect to watch for changes in the cart state and sync it with backend.
    because useEffect allows you to run side effects whenever some dependency changes.

    This can be done in any component, but we are doing it here in App component.
    
    Have side effect logic in a component and keep all our data transformation logic inside of a Reducer.
    "Lean Component & Fat Reducers"
  */
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending', // to show proper css classes in Notification.js
          title: 'Sending...',
          message: 'Sending Cart data!',
        })
      );
      const response = await fetch(
        'https://react-http-dba8a-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        {
          method: 'PUT', // to override existing data
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending Cart data failed!');
      }

      const data = await response.json();

      dispatch(
        uiActions.showNotification({
          status: 'success', // to show proper css classes in Notification.js
          title: 'Success!',
          message: 'Sent Cart data succesfully!',
        })
      );
    };

    // we should not send cart data as soon as page loads.
    if (isInitial) {
      isInitial = false;
      return;
    }

    // call
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error', // to show proper css classes in Notification.js
          title: 'Error!',
          message: 'Sent Cart data failed!',
        })
      );
    });
  }, [cart, dispatch]); // adding 'dispatch' to get rid of the IDE warnings, though dispatch function will never change

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;

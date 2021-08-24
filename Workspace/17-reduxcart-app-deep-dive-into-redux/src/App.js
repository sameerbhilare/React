import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-slice';
import { uiActions } from './store/ui-slice';

// this will be initialized only once. Doesn't get reinitialized on 'App' component reevaluation
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  const notification = useSelector((state) => state.ui.notification);

  /*
    APPROACH 1: HANDLING ASYNC TASKS INSIDE THE COMPONENT
    Listen to all state changes and if something changes sync it with backend.
    
    useEffect to watch for changes in the cart state and sync it with backend.
    because useEffect allows you to run side effects whenever some dependency changes.

    This can be done in any component, but we are doing it here in App component.
    
    Have side effect logic in a component and keep all our data transformation logic inside of a Reducer.
    "Lean Component & Fat Reducers"
  */
  /*
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
  */

  /*
    APPROACH 2: HANDLING ASYNC TASKS INSIDE ACTION CREATORS.

    Thunk - A function that delays an action until later.
    An action creator function that does NOT return the action itself 
    but another function which eventually returns the action.
  */
  useEffect(() => {
    // we should not send cart data as soon as page loads.
    if (isInitial) {
      isInitial = false;
      return;
    }

    /*
    The great thing about Redux when using Redux toolkit is that
    It does not just accept action objects with a type property. 
    But it also does accept, action creators that return functions.

    And if Redux sees, that you're dispatching a action which is actually a function instead of action object,
    it will execute that function (the function which is returned by sendCartData() in cart-slice.js) for you. 

    So that in that executed function (the function which is returned by sendCartData() in cart-slice.js),
    we can dispatch other actions again.
    Because there's a such a common pattern that we wanna have action creators that can perform side effects.
    And that can then dispatch other actions, which eventually reaches the reducers as part of a flow of side-effects,
    or as a flow of steps that should be taken.
    */
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

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

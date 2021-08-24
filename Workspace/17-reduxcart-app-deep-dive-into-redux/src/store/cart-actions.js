import { uiActions } from './ui-slice';

/*
  APPROACH 2: HANDLING ASYNC TASKS INSIDE ACTION CREATORS.
  Advantage of this approach is - "Lean components, Fat Reducers"

  Thunk - A function that delays an action until later.
  An action creator function that does NOT return the action itself 
  but another function which eventually returns the action.
*/
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // before dispatching action, wecan perform any side effect code here

    // dispatching OTHER action
    dispatch(
      uiActions.showNotification({
        status: 'pending', // to show proper css classes in Notification.js
        title: 'Sending...',
        message: 'Sending Cart data!',
      })
    );

    // nested function just to handle errors properly
    const sendRequest = async () => {
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
    };

    try {
      await sendRequest();
      // success
      dispatch(
        uiActions.showNotification({
          status: 'success', // to show proper css classes in Notification.js
          title: 'Success!',
          message: 'Sent Cart data succesfully!',
        })
      );
    } catch (error) {
      // failure
      dispatch(
        uiActions.showNotification({
          status: 'error', // to show proper css classes in Notification.js
          title: 'Error!',
          message: 'Sent Cart data failed!',
        })
      );
    }
  };
};

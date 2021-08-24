import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const initialCartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  // reducers must be pure,side effect free synchronous code functions
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      if (!existingItem) {
        /*
            Redux Toolkit internally ensures that this will not manipulate the existing state 
            but that it instead transforms this into an operation 
            which updates the state in an immutable way. So we can use push here when working with Redux Toolkit.
          */
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },

    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
  },
});

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

export const cartActions = cartSlice.actions;

export default cartSlice;

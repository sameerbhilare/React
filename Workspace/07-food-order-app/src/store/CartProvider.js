import { useReducer } from 'react';
import CartContext from './cart.context';

const defaultCartState = {
  items: [],
  amount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = state.items.concat(action.item); // to update state in immutable way
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantity;

    return {
      items: updatedItems,
      amount: updatedTotalAmount,
    };
  } else if (action.type === 'REMOVE_ITEM') {
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.amount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;

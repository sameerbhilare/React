// REDUX Logic
import { createStore } from 'redux';

/*
    Reducer function - which will update the state in the store.
    A reducer function is a standard JavaScript function, but it will it be called by the Redux library
    and it will then always receive two inputs - the existing state and the action that was dispatched.
    AND it must always return a new state object.

    A reducer function should be a "pure function" which basically means that the same inputs 
    always should produce exactly the same output. 
    And there should be no side effects inside of that function. 
    So you must not send a HTTP request or write something to local storage 
    or fetch something from local storage there.

    Instead, a reducer should really just be a function that takes the given inputs, 
    which are provided by Redux and then produces the expected output, a new state object.
*/
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount, // using payload
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

// create a store
/*
    Store needs the Reducer function as an input
    because the store needs to know which reducer is responsible for changing/manipulating this store.
    As soon as store is created, the reducer function is run.
*/
const store = createStore(counterReducer); // createStore is from 'redux' package

export default store;

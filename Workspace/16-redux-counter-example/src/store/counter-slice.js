import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = {
  counter: 0,
  showCounter: true,
};

/*
    createSlice is even more powerful than createReducer.
    It takes an object as an argument.
    With createSlice, we are preparing a slice of our global state.
    When we have different pieces of state which are not directly related, 
    e.g. authentication status and the counter status, we could create different slices
    potentially also in different files to make our code maintainable.

    Every slice needs a 'name' so an identifier of that piece of state.
    'initialState' which is initial state of this slice 
    and 'reducers' which is an object of all the reducers this slice needs.
    Each reducer method will be called for you by Redux, and they will receive the current state and action obj.
    It may not require action bcz these reducer methods will be called based on action itself

    createSlice automatically creates unique action identifiers for our different reducers.
    Those actions can be accessed via 'counterSlice.actions.'
*/
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      // here it is allowed to 'mutate' the state bcz :) ->
      /*
              When using Redux toolkit and its functions like createSlice, 
              we can't accidentally manipulate the existing state.
              Because Redux toolkit internally uses another package, called Immer, 
              which will automatically clone the existing state, create a new state object, 
              keep all the state which we're not editing, and override the state 
              which we are editing in an 'immutable' way.
          */
      state.counter++;
    },

    decrement(state) {
      state.counter--;
    },

    increase(state, action) {
      state.counter = state.counter + action.payload; // using payload
    },

    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// 'counterSlice.reducer' is single reducer which is merged with all the reducers mentioned above
export default counterSlice.reducer;

// createSlice automatically creates unique action identifiers for our different reducers.
// Those actions can be accessed via 'counterSlice.actions.
export const counterActions = counterSlice.actions;

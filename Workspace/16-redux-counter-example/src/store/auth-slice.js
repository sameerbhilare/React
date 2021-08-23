import { createSlice } from '@reduxjs/toolkit';

// initial state for Auth slice
const initialAuthState = { isAuthenticated: false };

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
// create new slice for Auth
const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

// 'authSlice.reducer' is single reducer which is merged with all the reducers mentioned above
export default authSlice.reducer;

// createSlice automatically creates unique action identifiers for our different reducers.
// Those actions can be accessed via 'counterSlice.actions.
export const authActions = authSlice.actions;

// REDUX Logic
import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './auth-slice';
import counterSliceReducer from './counter-slice';

// create a store
// configureStore() is powerful, we can add multiple slices of a store with it.
const store = configureStore({
  // value to this 'reducer' key be reducer of a single slice
  // or a map of reduers of multiple slices and
  // behind the scenes configureStore will merge all those reducers into one big reducer.
  //reducer: counterSlice.reducer, // single slice

  // individual reducers will be automatically merged into one main reducer internally
  // the keys here are imp ('counter', 'auth'), they are used to get specific slices
  reducer: { counter: counterSliceReducer, auth: authSliceReducer }, // multiple slices.
});

export default store;

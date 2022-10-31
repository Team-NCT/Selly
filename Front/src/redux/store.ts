import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

//! reducer import
import counter from "./slices/counterSlice";
import alert from "./slices/alertSlice";
import modal from "./slices/modalSlice";

const reducers = combineReducers({
  counter,
  alert,
  modal,
});

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

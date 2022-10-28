import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

//! reducer import
import counter from "./slices/counterSlice";
import alert from "@/redux/slices/alertSlice";

const reducers = combineReducers({
  counter,
  alert,
});

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

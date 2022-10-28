import { configureStore } from "@reduxjs/toolkit";
import counter from "./slices/counterSlice";

//! reducer import
import alert from "@/redux/slices/alertSlice";

const reducers = {
  counter,
  alert,
};

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

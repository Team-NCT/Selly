import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

//* Store
import { counter, alert, modal, account } from "@/store/index";

//* API
import { NFTDetailAPI, loginAPI } from "@/api";

const reducers = combineReducers({
  counter,
  alert,
  modal,
  [NFTDetailAPI.reducerPath]: NFTDetailAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  account,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(NFTDetailAPI.middleware, loginAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

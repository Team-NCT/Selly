import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

//* Store
import { counter, alert, modal, account, profleStatus } from "@/store/index";

//* API
import { NFTDetailAPI } from "@/api";

const reducers = combineReducers({
  counter,
  alert,
  modal,
  [NFTDetailAPI.reducerPath]: NFTDetailAPI.reducer,
  account,
  profleStatus,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(NFTDetailAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

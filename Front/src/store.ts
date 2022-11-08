import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

//* Store

import {
  counter,
  alert,
  modal,
  account,
  fraction,
  profleStatus,
  profileData,
  NFTValue,
  sellInfo,
} from "@/store/index";

//* API
import { NFTDetailAPI } from "@/api/server";

const reducers = combineReducers({
  counter,
  alert,
  modal,
  account,
  fraction,
  profleStatus,
  profileData,
  NFTValue,
  sellInfo,
  [NFTDetailAPI.reducerPath]: NFTDetailAPI.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(NFTDetailAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

//* Store
import {
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
import { NFTDetailAPI, searchAPI, createNFTAPI } from "@/api/server";

const reducers = combineReducers({
  alert,
  modal,
  account,
  fraction,
  profleStatus,
  profileData,
  NFTValue,
  sellInfo,
  [NFTDetailAPI.reducerPath]: NFTDetailAPI.reducer,
  [searchAPI.reducerPath]: searchAPI.reducer,
  [createNFTAPI.reducerPath]: createNFTAPI.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      NFTDetailAPI.middleware,
      searchAPI.middleware,
      createNFTAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

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
  signData,
} from "@/store/index";

//* API
import {
  NFTDetailAPI,
  searchAPI,
  loginAPI,
  createNFTAPI,
  userAPI,
  NFTTransactionAPI,
  exploreAPI,
} from "@/api/server";

const reducers = combineReducers({
  alert,
  modal,
  account,
  fraction,
  profleStatus,
  profileData,
  NFTValue,
  sellInfo,
  signData,
  [NFTDetailAPI.reducerPath]: NFTDetailAPI.reducer,
  [searchAPI.reducerPath]: searchAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  [createNFTAPI.reducerPath]: createNFTAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [NFTTransactionAPI.reducerPath]: NFTTransactionAPI.reducer,
  [exploreAPI.reducerPath]: exploreAPI.reducer,
});

// * session storage
const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["account"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      NFTDetailAPI.middleware,
      searchAPI.middleware,
      loginAPI.middleware,
      createNFTAPI.middleware,
      userAPI.middleware,
      NFTTransactionAPI.middleware,
      exploreAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;

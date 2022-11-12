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
} from "@/store/index";

//* API
import { NFTDetailAPI, searchAPI, loginAPI, createNFTAPI, userAPI, NFTTransactionAPI } from "@/api/server";

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
  [loginAPI.reducerPath]: loginAPI.reducer,
  [createNFTAPI.reducerPath]: createNFTAPI.reducer,
<<<<<<< HEAD
  [userAPI.reducerPath]: userAPI.reducer,
=======
  [NFTTransactionAPI.reducerPath]: NFTTransactionAPI.reducer,
>>>>>>> b013e841d66a7ef770f69e7d4e4f5790b2dd0363
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
      NFTTransactionAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;

import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer as reducer } from "./reducers";

// Configuration for Redux Persist
const persistConfig = {
  key: "trilium_root",
  version: 1,
  storage,
  whitelist: ["user"],
};

// Create a persisted reducer with the configuration
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure the Redux store with persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([]),
});

// Create a persistor for the Redux store
export const persistor = persistStore(store);

// Export the dispatch function from the store
export const storeAppDispatch = store.dispatch;

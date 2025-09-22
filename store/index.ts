import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { communities, selectedCommunity } from "./slices/CommunitySlice";
import loggedInUser from "./slices/StoreSlice";
import { persistStore, persistReducer } from "redux-persist";
import localforage from "localforage";

const persistConfig = {
  key: "communn",
  storage: localforage,
};

const rootReducer = combineReducers({
  loggedInUser,
  selectedCommunity: selectedCommunity.reducer,
  communities: communities.reducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: pReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/REGISTER',
          'persist/PURGE',
        ],
      },
    }),
});

export default store;
export const persister = persistStore(store);

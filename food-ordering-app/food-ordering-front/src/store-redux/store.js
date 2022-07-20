import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cartReducer from './cart/cartSlice';

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
    cart: cartReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
});

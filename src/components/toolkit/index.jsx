import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./AllCombineReducer"; // Assuming you have a combined and persisted reducer

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

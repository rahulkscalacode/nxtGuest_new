import { combineReducers } from "@reduxjs/toolkit";
import stripe from "../stripe";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import totalFare from "../totalFare";
import loader from "../loader";

// Persist configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["stripe"], // specify which reducers to persist (optional)
};

// Combine your reducers
const rootReducer = combineReducers({
  stripe,
  totalFare,
  loader,
});

// Wrap the combined reducers with persistReducer
export default persistReducer(persistConfig, rootReducer);

// export default combineReducers({
//     stripe
// })

import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";
import isPreloadReducer from "./isPreload/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    loadingBar: loadingBarReducer,
    isPreload: isPreloadReducer,
  },
});

export default store;

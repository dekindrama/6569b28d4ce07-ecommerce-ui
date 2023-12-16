import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";
import isPreloadReducer from "./isPreload/reducer";
import usersReducer from "./users/reducer";
import itemReducer from "./item/reducer";
import itemsReducer from "./items/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    loadingBar: loadingBarReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    item: itemReducer,
    items: itemsReducer,
  },
});

export default store;

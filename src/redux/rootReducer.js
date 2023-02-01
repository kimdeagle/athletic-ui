import storage from "redux-persist/lib/storage";
import auth from "./auth";
import menu from "./menu";
import {combineReducers} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";

const persistConfig = {
  key: 'menu',
  storage
}

const rootReducer = combineReducers({
  auth,
  menu: persistReducer(persistConfig, menu)
})

export default rootReducer
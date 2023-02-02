import storage from "redux-persist/lib/storage";
import common from "./common";
import auth from "./auth";
import menu from "./menu";
import {combineReducers} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";

const persistConfig = {
  key: 'menu',
  storage
}

const rootReducer = combineReducers({
  common,
  auth,
  menu: persistReducer(persistConfig, menu)
})

export default rootReducer
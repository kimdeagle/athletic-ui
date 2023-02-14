import {combineReducers} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import common from "./common";
import auth from "./auth";
import menu from "./menu";
import member from "./member";

const persistConfig = {
  key: 'menu',
  storage
}

const rootReducer = combineReducers({
  common,
  auth,
  menu: persistReducer(persistConfig, menu),
  member,
})

export default rootReducer
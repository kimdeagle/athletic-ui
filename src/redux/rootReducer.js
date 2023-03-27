import {combineReducers} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import common from "./common";
import auth from "./auth";
import menu from "./menu";
import member from "./member";
import admin from "./admin";
import authority from "./authority";
import dues from "./dues";

import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

const persistConfig = {
  key: 'menu',
  storage,
  stateReconciler: autoMergeLevel1 //dispatch 할 경우 병합(기존 데이터 삭제, 새 데이터 적용)
}

const rootReducer = combineReducers({
  common,
  auth,
  menu: persistReducer(persistConfig, menu),
  member,
  admin,
  authority,
  dues,
})

export default rootReducer
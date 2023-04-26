import {combineReducers} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import common from "./common";
import auth from "./auth";
import menu from "./system/menu";
import member from "./member";
import admin from "./admin";
import authority from "./system/authority";
import dues from "./dues";
import code from "./code";
import schedule from "./schedule";
import statistics from "./statistics";

import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const menuPersistConfig = {
  key: 'system/menu',
  storage,
  stateReconciler: autoMergeLevel1 //dispatch 할 경우 병합(기존 데이터 삭제, 새 데이터 적용)
}

const authPersistConfig = {
  key: 'auth',
  storage,
  stateReconciler: autoMergeLevel1
}

const rootReducer = combineReducers({
  common,
  auth: persistReducer(authPersistConfig, auth),
  member,
  admin,
  dues,
  system: combineReducers({
    menu: persistReducer(menuPersistConfig, menu),
    authority,
  }),
  code,
  schedule,
  statistics,
})

export default rootReducer
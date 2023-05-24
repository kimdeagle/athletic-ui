import {combineReducers} from "@reduxjs/toolkit";
import common from "./common";
import auth from "./auth";
import menu from "./system/menu";
import member from "./member";
import admin from "./system/admin";
import authority from "./system/authority";
import dues from "./dues";
import code from "./code";
import schedule from "./schedule";
import statistics from "./statistics";

const rootReducer = combineReducers({
  common,
  auth,
  member,
  dues,
  system: combineReducers({
    menu,
    authority,
    admin,
  }),
  code,
  schedule,
  statistics,
})

export default rootReducer
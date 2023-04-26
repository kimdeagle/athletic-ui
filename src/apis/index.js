import * as auth from "./auth";
import * as menu from "./system/menu";
import * as member from "./member";
import * as admin from "./admin";
import * as common from "./common";
import * as authority from "./system/authority";
import * as dues from "./dues";
import * as code from "./code";
import * as schedule from "./schedule";
import * as statistics from "./statistics";

const system = {
  menu,
  authority,
}

export {
  auth,
  member,
  admin,
  common,
  dues,
  system,
  code,
  schedule,
  statistics,
}
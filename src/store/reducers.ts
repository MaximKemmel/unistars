import { combineReducers } from "@reduxjs/toolkit";

import { reducer as coreReducer } from "./core/core.slice";
import { reducer as adminReducer } from "./admin/admin.slice";
import { reducer as universityReducer } from "./university/university.slice";

export const reducers = combineReducers({
  coreReducer,
  adminReducer,
  universityReducer,
});

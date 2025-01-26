import { combineReducers } from "@reduxjs/toolkit";

import { reducer as coreReducer } from "./core/core.slice";
import { reducer as adminReducer } from "./admin/admin.slice";
import { reducer as universityReducer } from "./university/university.slice";
import { reducer as subscriberReducer } from "./subscriber/subscriber.slice";
import { reducer as studentReducer } from "./student/student.slice";
import { reducer as ambassadorReducer } from "./ambassador/ambassador.slice";
import { reducer as employeeReducer } from "./employee/employee.slice";
import { reducer as bookletReducer } from "./booklet/booklet.slice";

export const reducers = combineReducers({
  coreReducer,
  adminReducer,
  universityReducer,
  subscriberReducer,
  studentReducer,
  ambassadorReducer,
  employeeReducer,
  bookletReducer,
});

import { combineReducers } from "@reduxjs/toolkit";

import { reducer as coreReducer } from "./core/core.slice";

export const reducers = combineReducers({ coreReducer });

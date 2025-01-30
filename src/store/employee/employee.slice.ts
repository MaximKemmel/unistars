import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getEmployeeList,
  patchEmployee,
  postEmployee,
} from "./employee.actions";

import { IUser } from "../../types/user/user";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IEmployeeState {
  employeeList: IUser[];
  getStatus: IApiStatus;
  postStatus: IApiStatus;
  patchStatus: IApiStatus;
}

const initialState: IEmployeeState = {
  employeeList: [] as IUser[],
  getStatus: initApiStatus(),
  postStatus: initApiStatus(),
  patchStatus: initApiStatus(),
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setGetStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
    setPostStatus(state, action: PayloadAction<IApiStatus>) {
      state.postStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region Employees list
    builder.addCase(getEmployeeList.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getEmployeeList.fulfilled, (state, action) => {
      state.employeeList = [] as IUser[];
      state.employeeList = action.payload as IUser[];
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getEmployeeList.rejected, (state, action) => {
      state.employeeList = [] as IUser[];
      state.getStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Add employee
    builder.addCase(postEmployee.pending, (state) => {
      state.postStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(postEmployee.fulfilled, (state) => {
      state.postStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(postEmployee.rejected, (state, action) => {
      state.postStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Edit employee
    builder.addCase(patchEmployee.pending, (state) => {
      state.patchStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(patchEmployee.fulfilled, (state) => {
      state.patchStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(patchEmployee.rejected, (state, action) => {
      state.patchStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = employeeSlice;

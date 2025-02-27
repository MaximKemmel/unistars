import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getEmployeeList,
  editEmployee,
  postEmployee,
  deleteEmployers,
} from "./employee.actions";

import { IUser } from "../../types/user/user";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IEmployeeState {
  employeeList: IUser[];
  getStatus: IApiStatus;
  postStatus: IApiStatus;
  editStatus: IApiStatus;
  deleteStatus: IApiStatus;
}

const initialState: IEmployeeState = {
  employeeList: [] as IUser[],
  getStatus: initApiStatus(),
  postStatus: initApiStatus(),
  editStatus: initApiStatus(),
  deleteStatus: initApiStatus(),
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setGetStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
    setPostEmployeeStatus(state, action: PayloadAction<IApiStatus>) {
      state.postStatus = action.payload;
    },
    setEditEmployeeStatus(state, action: PayloadAction<IApiStatus>) {
      state.editStatus = action.payload;
    },
    setDeleteEmployersStatus(state, action: PayloadAction<IApiStatus>) {
      state.deleteStatus = action.payload;
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
    builder.addCase(editEmployee.pending, (state) => {
      state.editStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(editEmployee.fulfilled, (state) => {
      state.editStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(editEmployee.rejected, (state, action) => {
      state.editStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Delete employers
    builder.addCase(deleteEmployers.pending, (state) => {
      state.deleteStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(deleteEmployers.fulfilled, (state) => {
      state.deleteStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(deleteEmployers.rejected, (state, action) => {
      state.deleteStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = employeeSlice;

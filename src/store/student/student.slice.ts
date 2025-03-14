import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getStudents } from "./student.actions";

import { IUser } from "../../types/user/user";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IStudentState {
  studentList: IUser[];
  getStatus: IApiStatus;
}

const initialState: IStudentState = {
  studentList: [] as IUser[],
  getStatus: initApiStatus(),
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setGetStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
    clearStudents(state) {
      state.studentList = [] as IUser[];
    },
  },
  extraReducers: (builder) => {
    //#region Student
    builder.addCase(getStudents.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.studentList = [] as IUser[];
      state.studentList = action.payload as IUser[];
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getStudents.rejected, (state, action) => {
      state.getStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = studentSlice;

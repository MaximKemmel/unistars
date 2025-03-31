import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getProfilesList } from "./profile.actions";

import { IStudentProfile } from "../../types/student/studentProfile";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IProfileState {
  profilesList: IStudentProfile[];
  getStatus: IApiStatus;
}

const initialState: IProfileState = {
  profilesList: [] as IStudentProfile[],
  getStatus: initApiStatus(),
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setGetStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region Profiles list
    builder.addCase(getProfilesList.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getProfilesList.fulfilled, (state, action) => {
      state.profilesList = [];
      state.profilesList = action.payload as IStudentProfile[];
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getProfilesList.rejected, (state, action) => {
      state.profilesList = [];
      state.getStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = profileSlice;

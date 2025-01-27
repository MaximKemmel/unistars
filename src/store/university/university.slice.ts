import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getUniversityProfile,
  editUniversityProfile,
} from "./university.actions";

import { IUniversity } from "../../types/university/university";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IUniversityState {
  universityProfile: IUniversity;
  getStatus: IApiStatus;
  editStatus: IApiStatus;
}

const initialState: IUniversityState = {
  universityProfile: { name: "" },
  getStatus: initApiStatus(),
  editStatus: initApiStatus(),
};

export const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {
    setGetStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
    setEditStatus(state, action: PayloadAction<IApiStatus>) {
      state.editStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region University Profile
    builder.addCase(getUniversityProfile.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getUniversityProfile.fulfilled, (state, action) => {
      state.universityProfile = { name: "" };
      state.universityProfile = action.payload as IUniversity;
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getUniversityProfile.rejected, (state, action) => {
      state.universityProfile = { name: "" };
      state.getStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region University Profile
    builder.addCase(editUniversityProfile.pending, (state) => {
      state.editStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(editUniversityProfile.fulfilled, (state) => {
      state.editStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(editUniversityProfile.rejected, (state, action) => {
      state.editStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = universitySlice;

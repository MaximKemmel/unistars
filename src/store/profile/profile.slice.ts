import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getProfilesList } from "./profile.actions";

import { IProfile } from "src/types/profile/profile";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IProfileState {
  profilesList: IProfile[];
  getStatus: IApiStatus;
}

const initialState: IProfileState = {
  profilesList: [] as IProfile[],
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
      const response = action.payload;
      state.profilesList = response.content as IProfile[];
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

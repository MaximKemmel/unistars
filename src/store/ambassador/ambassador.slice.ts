import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getAmbassador } from "./ambassador.actions";

import { IUser } from "../../types/user/user";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IAmbassadorState {
  ambassadorList: IUser[];
  getStatus: IApiStatus;
}

const initialState: IAmbassadorState = {
  ambassadorList: [] as IUser[],
  getStatus: initApiStatus(),
};

export const ambassadorSlice = createSlice({
  name: "ambassador",
  initialState,
  reducers: {
    setGetStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
    clearAmbassadors(state) {
      state.ambassadorList = [] as IUser[];
    },
  },
  extraReducers: (builder) => {
    //#region Ambassador
    builder.addCase(getAmbassador.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getAmbassador.fulfilled, (state, action) => {
      state.ambassadorList =
        state.ambassadorList.length === 0
          ? [action.payload as IUser]
          : [...state.ambassadorList, action.payload as IUser];
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getAmbassador.rejected, (state, action) => {
      state.getStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = ambassadorSlice;

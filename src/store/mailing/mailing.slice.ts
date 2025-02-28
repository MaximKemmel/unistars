import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getMailingList } from "./mailing.actions";

import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IEmployeeState {
  getStatus: IApiStatus;
}

const initialState: IEmployeeState = {
  getStatus: initApiStatus(),
};

export const mailingSlice = createSlice({
  name: "mailing",
  initialState,
  reducers: {
    setGetStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region Mailing list
    builder.addCase(getMailingList.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getMailingList.fulfilled, (state) => {
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getMailingList.rejected, (state, action) => {
      state.getStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = mailingSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getSubscribersList, getSubscribersFile } from "./subscriber.actions";

import { IUser } from "../../types/user/user";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface ISubscriberState {
  subscriberList: IUser[];
  getStatus: IApiStatus;
  getFileStatus: IApiStatus;
}

const initialState: ISubscriberState = {
  subscriberList: [] as IUser[],
  getStatus: initApiStatus(),
  getFileStatus: initApiStatus(),
};

export const subscriberSlice = createSlice({
  name: "subscriber",
  initialState,
  reducers: {
    setGetStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
    setGetFileStatus(state, action: PayloadAction<IApiStatus>) {
      state.getFileStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region Subscribers list
    builder.addCase(getSubscribersList.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getSubscribersList.fulfilled, (state, action) => {
      state.subscriberList = [];
      state.subscriberList = action.payload as IUser[];
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getSubscribersList.rejected, (state, action) => {
      state.subscriberList = [];
      state.getStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Subscribers file
    builder.addCase(getSubscribersFile.pending, (state) => {
      state.getFileStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getSubscribersFile.fulfilled, (state) => {
      state.getFileStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getSubscribersFile.rejected, (state, action) => {
      state.getFileStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = subscriberSlice;

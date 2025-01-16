import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getPeriodSubscribersList, getSubscribersList } from "./subscriber.actions";

import { IUser } from "../../types/user/user";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface ISubscriberState {
  allSubscribers: IUser[];
  periodSubscribers: IUser[];
  getStatus: IApiStatus;
}

const initialState: ISubscriberState = {
  allSubscribers: [] as IUser[],
  periodSubscribers: [] as IUser[],
  getStatus: initApiStatus(),
};

export const subscriberSlice = createSlice({
  name: "subscriber",
  initialState,
  reducers: {
    setGetStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region Subscribers list
    builder.addCase(getSubscribersList.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getSubscribersList.fulfilled, (state, action) => {
      state.allSubscribers = [];
      state.allSubscribers = action.payload as IUser[];
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getSubscribersList.rejected, (state, action) => {
      state.allSubscribers = [];
      state.getStatus = { status: ApiStatusType.ERROR, error: action.payload as string };
    });
    //#endregion

    //#region Period subscribers list
    builder.addCase(getPeriodSubscribersList.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getPeriodSubscribersList.fulfilled, (state, action) => {
      state.periodSubscribers = [];
      state.periodSubscribers = action.payload as IUser[];
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getPeriodSubscribersList.rejected, (state, action) => {
      state.periodSubscribers = [];
      state.getStatus = { status: ApiStatusType.ERROR, error: action.payload as string };
    });
    //#endregion
  },
});

export const { actions, reducer } = subscriberSlice;

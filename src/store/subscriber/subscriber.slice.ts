import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getSubscribersList } from "./subscriber.actions";

import { IUser } from "../../types/user/user";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface ISubscriberState {
  subscribers: IUser[];
  getStatus: IApiStatus;
}

const initialState: ISubscriberState = {
  subscribers: [] as IUser[],
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
    //#region Adverts list
    builder.addCase(getSubscribersList.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getSubscribersList.fulfilled, (state, action) => {
      state.subscribers = [];
      state.subscribers = action.payload as IUser[];
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getSubscribersList.rejected, (state, action) => {
      state.subscribers = [];
      state.getStatus = { status: ApiStatusType.ERROR, error: action.payload as string };
    });
    //#endregion
  },
});

export const { actions, reducer } = subscriberSlice;

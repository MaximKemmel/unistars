import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getAdvertList, postAdvert, deleteAdvert } from "./advert.actions";

import { IAdvert } from "../../types/advert/advert";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IAdvertState {
  adverts: IAdvert[];
  getStatus: IApiStatus;
  postStatus: IApiStatus;
  deleteStatus: IApiStatus;
}

const initialState: IAdvertState = {
  adverts: [] as IAdvert[],
  getStatus: initApiStatus(),
  postStatus: initApiStatus(),
  deleteStatus: initApiStatus(),
};

export const advertSlice = createSlice({
  name: "advert",
  initialState,
  reducers: {
    setGetStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
    setPostStatus(state, action: PayloadAction<IApiStatus>) {
      state.postStatus = action.payload;
    },
    setDeleteStatus(state, action: PayloadAction<IApiStatus>) {
      state.deleteStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region Adverts list
    builder.addCase(getAdvertList.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getAdvertList.fulfilled, (state, action) => {
      state.adverts = [];
      state.adverts = action.payload as IAdvert[];
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getAdvertList.rejected, (state, action) => {
      state.adverts = [];
      state.getStatus = { status: ApiStatusType.ERROR, error: action.payload as string };
    });
    //#endregion

    //#region Post advert
    builder.addCase(postAdvert.pending, (state) => {
      state.postStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(postAdvert.fulfilled, (state, action) => {
      const newAdvert = action.payload as IAdvert;
      if (newAdvert && newAdvert !== undefined) {
        state.adverts.push(newAdvert);
        state.postStatus = { status: ApiStatusType.SUCCESS };
      } else {
        state.postStatus = { status: ApiStatusType.ERROR };
      }
    });
    builder.addCase(postAdvert.rejected, (state, action) => {
      state.postStatus = { status: ApiStatusType.ERROR, error: action.payload as string };
    });
    //#endregion

    //#region Delete advert
    builder.addCase(deleteAdvert.pending, (state) => {
      state.deleteStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(deleteAdvert.fulfilled, (state) => {
      state.deleteStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(deleteAdvert.rejected, (state, action) => {
      state.deleteStatus = { status: ApiStatusType.ERROR, error: action.payload as string };
    });
    //#endregion
  },
});

export const { actions, reducer } = advertSlice;

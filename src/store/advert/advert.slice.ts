import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getAdvertList,
  getAdvertRequestList,
  postAdvert,
  uploadAdvertCover,
} from "./advert.actions";

import { IAdvert } from "../../types/advert/advert";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";
import { IAdvertRequest } from "src/types/advert/advertRequest";

interface IAdvertState {
  adverts: IAdvert[];
  advertCover: string;
  getStatus: IApiStatus;
  getRequestsStatus: IApiStatus;
  postStatus: IApiStatus;
  uploadCoverStatus: IApiStatus;
}

const initialState: IAdvertState = {
  adverts: [] as IAdvert[],
  advertCover: "",
  getStatus: initApiStatus(),
  getRequestsStatus: initApiStatus(),
  postStatus: initApiStatus(),
  uploadCoverStatus: initApiStatus(),
};

export const advertSlice = createSlice({
  name: "advert",
  initialState,
  reducers: {
    setGetAdvertsStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
    setPostAdvertStatus(state, action: PayloadAction<IApiStatus>) {
      state.postStatus = action.payload;
    },
    setUploadCoverStatus(state, action: PayloadAction<IApiStatus>) {
      state.uploadCoverStatus = action.payload;
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
      state.getStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Advert requests list
    builder.addCase(getAdvertRequestList.pending, (state) => {
      state.getRequestsStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getAdvertRequestList.fulfilled, (state, action) => {
      const requests = action.payload as IAdvertRequest[];
      let tmpAdverts = [] as IAdvert[];
      state.adverts.forEach((advert: IAdvert) => {
        tmpAdverts.push({ ...advert, state: 2 });
      });
      requests.forEach((request: IAdvertRequest) => {
        if (
          request.advertising !== null &&
          request.advertising !== undefined &&
          !state.adverts
            .map((advert: IAdvert) => advert.id)
            .includes(request.advertising.id)
        ) {
          tmpAdverts.push({
            ...request.advertising!,
            state: request.isRejected ? 0 : 1,
          });
        }
      });
      state.adverts = tmpAdverts;
      state.getRequestsStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getAdvertRequestList.rejected, (state, action) => {
      state.getRequestsStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Post advert
    builder.addCase(postAdvert.pending, (state) => {
      state.postStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(postAdvert.fulfilled, (state) => {
      state.postStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(postAdvert.rejected, (state, action) => {
      state.postStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Upload cover
    builder.addCase(uploadAdvertCover.pending, (state) => {
      state.uploadCoverStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(uploadAdvertCover.fulfilled, (state, action) => {
      state.uploadCoverStatus = { status: ApiStatusType.SUCCESS };
      state.advertCover = action.payload;
    });
    builder.addCase(uploadAdvertCover.rejected, (state, action) => {
      state.uploadCoverStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
  },
});

export const { actions, reducer } = advertSlice;

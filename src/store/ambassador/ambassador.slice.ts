import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  acceptAmbassador,
  exceptAmbassador,
  getAmbassador,
  getAmbassadorRequest,
} from "./ambassador.actions";

import { IUser } from "../../types/user/user";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IAmbassadorState {
  ambassadorList: IUser[];
  ambassadorRequestList: IUser[];
  getStatus: IApiStatus;
  acceptStatus: IApiStatus;
  deleteStatus: IApiStatus;
}

const initialState: IAmbassadorState = {
  ambassadorList: [] as IUser[],
  ambassadorRequestList: [] as IUser[],
  getStatus: initApiStatus(),
  acceptStatus: initApiStatus(),
  deleteStatus: initApiStatus(),
};

export const ambassadorSlice = createSlice({
  name: "ambassador",
  initialState,
  reducers: {
    setGetAmbassadorsStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
    setAcceptAmbassadorStatus(state, action: PayloadAction<IApiStatus>) {
      state.acceptStatus = action.payload;
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

    //#region Request ambassador
    builder.addCase(getAmbassadorRequest.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getAmbassadorRequest.fulfilled, (state, action) => {
      state.ambassadorRequestList =
        state.ambassadorRequestList.length === 0
          ? [action.payload as IUser]
          : [...state.ambassadorRequestList, action.payload as IUser];
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getAmbassadorRequest.rejected, (state, action) => {
      state.getStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Accept ambassador
    builder.addCase(acceptAmbassador.pending, (state) => {
      state.acceptStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(acceptAmbassador.fulfilled, (state) => {
      state.acceptStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(acceptAmbassador.rejected, (state, action) => {
      state.acceptStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Delete ambassador
    builder.addCase(exceptAmbassador.pending, (state) => {
      state.deleteStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(exceptAmbassador.fulfilled, (state) => {
      state.deleteStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(exceptAmbassador.rejected, (state, action) => {
      state.deleteStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = ambassadorSlice;

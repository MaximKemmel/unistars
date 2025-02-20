import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { login, refreshToken } from "./admin.actions";

import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";
import { ILoginResponse } from "../../types/loginResponse/loginResponse";

interface IAdminState {
  isAuth: boolean;
  isRefreshed: boolean;
  loginResponse: ILoginResponse;
  loginStatus: IApiStatus;
  refreshStatus: IApiStatus;
}

const initialState: IAdminState = {
  isAuth: false,
  isRefreshed: false,
  loginResponse: { accessToken: "", refreshToken: "" },
  loginStatus: initApiStatus(),
  refreshStatus: initApiStatus(),
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    authMe(state) {
      state.isAuth =
        window.localStorage.getItem("unistars_token") != null &&
        window.localStorage.getItem("unistars_refresh_token") != null;
    },
    logout(state) {
      window.localStorage.removeItem("unistars_token");
      window.localStorage.removeItem("unistars_refresh_token");
      state.isAuth = false;
    },
    setLoginStatus(state, action: PayloadAction<IApiStatus>) {
      state.loginStatus = action.payload;
    },
    setRefreshStatus(state, action: PayloadAction<IApiStatus>) {
      state.refreshStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region Login
    builder.addCase(login.pending, (state) => {
      state.loginStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginStatus = { status: ApiStatusType.SUCCESS };
      state.loginResponse = action.payload;
      window.localStorage.setItem(
        "unistars_token",
        state.loginResponse.accessToken,
      );
      window.localStorage.setItem(
        "unistars_refresh_token",
        state.loginResponse.refreshToken,
      );
      state.isAuth = true;
      state.isRefreshed = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Refresh token
    builder.addCase(refreshToken.pending, (state) => {
      state.refreshStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.refreshStatus = { status: ApiStatusType.SUCCESS };
      state.loginResponse = action.payload;
      window.localStorage.setItem(
        "unistars_token",
        state.loginResponse.accessToken,
      );
      state.isRefreshed = true;
      state.isAuth = true;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.refreshStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = adminSlice;

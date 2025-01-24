import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { login } from "./admin.actions";

import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";
import { ILoginResponse } from "../../types/loginResponse/loginResponse";

interface IAdminState {
  isAuth: boolean;
  loginStatus: IApiStatus;
  loginResponse: ILoginResponse;
}

const initialState: IAdminState = {
  isAuth: false,
  loginStatus: initApiStatus(),
  loginResponse: { accessToken: "", refreshToken: "" },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLoginStatus(state, action: PayloadAction<IApiStatus>) {
      state.loginStatus = action.payload;
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
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = adminSlice;

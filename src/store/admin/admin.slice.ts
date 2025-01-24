import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { login } from "./admin.actions";

import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IAdminState {
  isAuth: boolean;
  loginStatus: IApiStatus;
}

const initialState: IAdminState = {
  isAuth: false,
  loginStatus: initApiStatus(),
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
      const accessToken = action.payload.accessToken;
      const refreshToken = action.payload.refreshToken;
      console.log(accessToken);
      console.log(refreshToken);
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

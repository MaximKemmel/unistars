import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const login = createAsyncThunk(
  "api/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const changePassword = createAsyncThunk(
  "api/changePassword",
  async (
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post("/change_password", {
        passwordOld: oldPassword,
        passwordNew: newPassword,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const refreshToken = createAsyncThunk(
  "api/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/refresh", {
        refreshToken: localStorage.getItem("unistars_refresh_token"),
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const requestUniversity = createAsyncThunk(
  "api/requestUniversity",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/request_new_university ", {
        email: email,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

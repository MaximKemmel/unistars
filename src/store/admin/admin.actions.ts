import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const login = createAsyncThunk(
  "api/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    const response = await axios.post("/login", {
      email: email,
      password: password,
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const refreshToken = createAsyncThunk(
  "api/refresh",
  async (_, { rejectWithValue }) => {
    const response = await axios.post("/refresh", {
      refreshToken: localStorage.getItem("unistars_refresh_token"),
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

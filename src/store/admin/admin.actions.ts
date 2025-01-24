import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const login = createAsyncThunk(
  "api/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    const response = await axios.post("/login", {
      params: {
        email: email,
        password: password,
      },
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

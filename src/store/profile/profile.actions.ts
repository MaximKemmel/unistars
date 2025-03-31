import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getProfilesList = createAsyncThunk(
  "api/getProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/student_profiles?size=100000`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

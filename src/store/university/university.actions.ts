import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getUniversityProfile = createAsyncThunk(
  "api/getUniversityProfile",
  async (_, { rejectWithValue }) => {
    const response = await axios.get(`/university_profile`);
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

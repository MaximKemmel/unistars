import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getStudents = createAsyncThunk(
  "api/getStudents",
  async (_, { rejectWithValue }) => {
    const response = await axios.get(`/university_students?size=10000`);
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

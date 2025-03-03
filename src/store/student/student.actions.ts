import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getStudents = createAsyncThunk(
  "api/getStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/university_students?size=10000`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

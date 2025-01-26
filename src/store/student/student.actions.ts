import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getStudent = createAsyncThunk(
  "api/getStudent",
  async ({ studentId }: { studentId: number }, { rejectWithValue }) => {
    const response = await axios.get(`/student_profile?id=${studentId}`);
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getEmployeeList = createAsyncThunk(
  "api/getEmployeeList",
  async (_, { rejectWithValue }) => {
    const response = await axios.get("/employee/get_my");
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

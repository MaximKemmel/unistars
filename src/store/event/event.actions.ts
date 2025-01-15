import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getEventTypes = createAsyncThunk("api/getEventTypes", async (_, { rejectWithValue }) => {
  const response = await axios.get("/eventTypes");
  if (response.status !== 200) {
    throw rejectWithValue("Server error!");
  }
  return response.data;
});
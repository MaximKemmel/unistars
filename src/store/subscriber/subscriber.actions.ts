import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getSubscribersList = createAsyncThunk(
  "api/getSubscribers",
  async ({ universityId, startDate, endDate }: { universityId: number, startDate: Date, endDate: Date }, { rejectWithValue }) => {
    const response = await axios.get(`/subscribers?universityId=${universityId}&afterDate=${startDate}&beforeDate=${endDate}`);
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  }
);
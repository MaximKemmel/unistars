import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getAmbassador = createAsyncThunk(
  "api/getAmbassador",
  async ({ ambassadorId }: { ambassadorId: number }, { rejectWithValue }) => {
    const response = await axios.get(`/student_profile?id=${ambassadorId}`);
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

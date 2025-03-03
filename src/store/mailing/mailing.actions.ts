import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getMailingList = createAsyncThunk(
  "api/getMailingList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/email_mass_communication");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getMailingList = createAsyncThunk(
  "api/getMailingList",
  async (_, { rejectWithValue }) => {
    const response = await axios.get("/email_mass_communication");
    console.log(response.data);
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

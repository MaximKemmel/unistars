import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getCountries = createAsyncThunk("api/getCountries", async (_, { rejectWithValue }) => {
  const response = await axios.get("/countries");
  if (response.status !== 200) {
    throw rejectWithValue("Server error!");
  }
  return response.data;
});

export const getCities = createAsyncThunk("api/getCities", async (_, { rejectWithValue }) => {
  const response = await axios.get("/cities");
  if (response.status !== 200) {
    throw rejectWithValue("Server error!");
  }
  return response.data;
});

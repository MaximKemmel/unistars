import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getCountries = createAsyncThunk(
  "api/getCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/countries");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getCities = createAsyncThunk(
  "api/getCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/cities");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getLanguages = createAsyncThunk(
  "api/getLanguages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/languagesOfInstructions");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

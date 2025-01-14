import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getCountries = createAsyncThunk("api/getCountries", async () => {
  const response = await axios.get("/countries");
  return response.data;
});

export const getCities = createAsyncThunk("api/getCities", async () => {
  const response = await axios.get("/cities");
  return response.data;
});

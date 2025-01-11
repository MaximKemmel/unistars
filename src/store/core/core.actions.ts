import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getCountries = createAsyncThunk("api/getCountries", async () => {
  const response = await axios.get("http://51.250.4.213:8081/v1/countries");
  return response.data;
});

export const getCities = createAsyncThunk("api/getCities", async () => {
  const response = await axios.get("http://51.250.4.213:8081/v1/cities");
  return response.data;
});

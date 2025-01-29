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

export const getAmbassadorRequest = createAsyncThunk(
  "api/getAmbassadorRequest",
  async ({ ambassadorId }: { ambassadorId: number }, { rejectWithValue }) => {
    const response = await axios.get(`/student_profile?id=${ambassadorId}`);
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const acceptAmbassador = createAsyncThunk(
  "api/acceptAmbassador",
  async (
    { ambassadorId, isAccept }: { ambassadorId: number; isAccept: boolean },
    { rejectWithValue },
  ) => {
    const response = await axios.post(`/accept_ambassador`, {
      ambassadorId: ambassadorId,
      accept: isAccept,
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const exceptAmbassador = createAsyncThunk(
  "api/exceptAmbassador",
  async ({ ambassadorId }: { ambassadorId: number }, { rejectWithValue }) => {
    const response = await axios.post(`/except_ambassador`, {
      studentId: ambassadorId,
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

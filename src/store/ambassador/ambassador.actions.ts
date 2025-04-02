import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

export const getAmbassadorList = createAsyncThunk(
  "api/getAmbassadorList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/ambassadors`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getAmbassador = createAsyncThunk(
  "api/getAmbassador",
  async ({ ambassadorId }: { ambassadorId: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/student_profile?id=${ambassadorId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getAmbassadorRequest = createAsyncThunk(
  "api/getAmbassadorRequest",
  async ({ ambassadorId }: { ambassadorId: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/student_profile?id=${ambassadorId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const acceptAmbassador = createAsyncThunk(
  "api/acceptAmbassador",
  async (
    { ambassadorId, isAccept }: { ambassadorId: number; isAccept: boolean },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(`/accept_ambassador`, {
        ambassadorId: ambassadorId,
        accept: isAccept,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const exceptAmbassador = createAsyncThunk(
  "api/exceptAmbassador",
  async ({ ambassadorId }: { ambassadorId: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/except_ambassador`, {
        studentId: ambassadorId,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

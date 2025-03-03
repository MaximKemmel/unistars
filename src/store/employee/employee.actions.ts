import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

import { IUser } from "../../types/user/user";

export const getEmployeeList = createAsyncThunk(
  "api/getEmployeeList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/employee/get_my");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const postEmployee = createAsyncThunk(
  "api/postEmployee",
  async ({ employee }: { employee: IUser }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/employee", {
        email: employee.email,
        profession: employee.profession,
        permissions: employee.permissions,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const editEmployee = createAsyncThunk(
  "api/editEmployee",
  async ({ employee }: { employee: IUser }, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/employee", {
        id: employee.id,
        profession: employee.profession,
        permissions: employee.permissions,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteEmployers = createAsyncThunk(
  "api/deleteEmployers",
  async ({ employers }: { employers: number[] }, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/employee", {
        params: {
          ids: employers,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

import { IUser } from "../../types/user/user";

export const getEmployeeList = createAsyncThunk(
  "api/getEmployeeList",
  async (_, { rejectWithValue }) => {
    const response = await axios.get("/employee/get_my");
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const postEmployee = createAsyncThunk(
  "api/postEmployee",
  async ({ employee }: { employee: IUser }, { rejectWithValue }) => {
    const response = await axios.post("/employee", {
      email: employee.email,
      profession: employee.profession,
      permissions: employee.permissions,
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const editEmployee = createAsyncThunk(
  "api/editEmployee",
  async ({ employee }: { employee: IUser }, { rejectWithValue }) => {
    const response = await axios.patch("/employee", {
      id: employee.id,
      profession: employee.profession,
      permissions: employee.permissions,
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

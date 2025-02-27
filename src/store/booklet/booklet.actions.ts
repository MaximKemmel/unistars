import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

import { IBooklet } from "../../types/booklet/booklet.js";

export const getBookletList = createAsyncThunk(
  "api/getBookletList",
  async ({ universityId }: { universityId: number }, { rejectWithValue }) => {
    const response = await axios.get(
      `/booklet/get_list?universityId=${universityId}`,
    );
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const postBooklet = createAsyncThunk(
  "api/postBooklet",
  async ({ booklet }: { booklet: IBooklet }, { rejectWithValue }) => {
    const response = await axios.post("/booklet", {
      title: booklet.title,
      bookletFileUrl: booklet.bookletFileUrl,
      description: booklet.description,
      imageUrl: booklet.imageUrl,
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const editBooklet = createAsyncThunk(
  "api/editBooklet",
  async ({ booklet }: { booklet: IBooklet }, { rejectWithValue }) => {
    const response = await axios.patch("/booklet", {
      id: booklet.id,
      title: booklet.title,
      bookletFileUrl: booklet.bookletFileUrl,
      description: booklet.description,
      imageUrl: booklet.imageUrl,
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const deleteBooklet = createAsyncThunk(
  "api/deleteBooklet",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    const response = await axios.delete(`/booklet?id=${id}`);
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const uploadBookletCover = createAsyncThunk(
  "uploadBookletCover",
  async (
    {
      file,
      onUploadProgress,
    }: {
      file: Blob;
      onUploadProgress: Function;
    },
    { rejectWithValue },
  ) => {
    const formData = new FormData();
    formData.append("type", "IMAGE");
    formData.append("files", file);
    const response = await axios.post("/storage", formData, {
      onUploadProgress: (data) => onUploadProgress(data),
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const uploadBookletFile = createAsyncThunk(
  "uploadBookletFile",
  async (
    {
      file,
      onUploadProgress,
    }: {
      file: Blob;
      onUploadProgress: Function;
    },
    { rejectWithValue },
  ) => {
    const formData = new FormData();
    formData.append("type", "DOCUMENT");
    formData.append("files", file);
    const response = await axios.post("/storage", formData, {
      onUploadProgress: (data) => onUploadProgress(data),
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

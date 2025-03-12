import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

import { IBooklet } from "../../types/booklet/booklet.js";

export const getBookletList = createAsyncThunk(
  "api/getBookletList",
  async ({ universityId }: { universityId: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/booklet/get_list?universityId=${universityId}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const postBooklet = createAsyncThunk(
  "api/postBooklet",
  async ({ booklet }: { booklet: IBooklet }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/booklet", {
        title: booklet.title,
        bookletFileUrl: booklet.bookletFileUrl,
        description: booklet.description,
        imageUrl: booklet.imageUrl,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const editBooklet = createAsyncThunk(
  "api/editBooklet",
  async ({ booklet }: { booklet: IBooklet }, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/booklet", {
        id: booklet.id,
        title: booklet.title,
        bookletFileUrl: booklet.bookletFileUrl,
        description: booklet.description,
        imageUrl: booklet.imageUrl,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteBooklet = createAsyncThunk(
  "api/deleteBooklet",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/booklet/pending_delete?id=${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const rollbackDeleteBooklet = createAsyncThunk(
  "api/rollbackDeleteBooklet",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/cancel_pending_request?requestId=${id}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
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
    try {
      const formData = new FormData();
      formData.append("type", "IMAGE");
      formData.append("files", file);
      const response = await axios.post("/storage", formData, {
        onUploadProgress: (data) => onUploadProgress(data),
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
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
    try {
      const formData = new FormData();
      formData.append("type", "DOCUMENT");
      formData.append("files", file);
      const response = await axios.post("/storage", formData, {
        onUploadProgress: (data) => onUploadProgress(data),
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

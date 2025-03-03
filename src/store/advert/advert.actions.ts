import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

import { IAdvert } from "../../types/advert/advert.js";

export const getAdvertList = createAsyncThunk(
  "api/getAdvertsByUniversity",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/advertising/get_my`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getAdvertRequestList = createAsyncThunk(
  "api/getAdvertRequestList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/my_request_advertising`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const postAdvert = createAsyncThunk(
  "api/postAdvert",
  async ({ advert }: { advert: IAdvert }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/request_advertising", {
        title: advert.title,
        subtitle: advert.subtitle,
        description: "There is not that field",
        imageUrl: advert.imageUrl,
        websiteUrl: advert.websiteUrl,
        communicationEmail: advert.email,
        startDate: advert.startDate,
        endDate: advert.endDate,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const uploadAdvertCover = createAsyncThunk(
  "uploadAdvertCover",
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

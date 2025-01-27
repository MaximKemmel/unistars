import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

import { IAdvert } from "../../types/advert/advert.js";

export const getAdvertList = createAsyncThunk(
  "api/getAdvertsByUniversity",
  async (_, { rejectWithValue }) => {
    const response = await axios.get(`/advertising/get_list`);
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const postAdvert = createAsyncThunk(
  "api/postAdvert",
  async ({ advert }: { advert: IAdvert }, { rejectWithValue }) => {
    const response = await axios.post("/advertising", {
      universityId: advert.universityId,
      title: advert.title,
      subtitle: advert.subtitle,
      description: advert.description,
      imageUrl: advert.imageUrl,
      websiteUrl: advert.websiteUrl,
      screenDestination: advert.screenDestination,
      bannerSize: advert.bannerSize,
      clickLimit: advert.clickLimit,
      clickLimitByUser: advert.clickLimitByUser,
      showsLimit: advert.showsLimit,
      showsLimitByUser: advert.showsLimitByUser,
      startDate: advert.startDate,
      endDate: advert.endDate,
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

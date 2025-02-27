import { createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";
import download from "downloadjs";

import axios from "../../utils/axios.js";

export const getSubscribersList = createAsyncThunk(
  "api/getSubscribers",
  async ({ universityId }: { universityId: number }, { rejectWithValue }) => {
    const response = await axios.get(
      `/subscribers?universityId=${universityId}`,
      {
        params: {
          afterDate: "2020-01-01",
          beforeDate: format(new Date(), "yyyy-MM-dd"),
        },
      },
    );
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const getSubscribersFile = createAsyncThunk(
  "api/getSubscribersFile",
  async (_, { rejectWithValue }) => {
    const response = await axios.get("/download_subscribers", {
      params: {
        afterDate: "2020-01-01",
        beforeDate: format(new Date(), "yyyy-MM-dd"),
      },
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        console.log(
          "Download progress: " +
            Math.round(
              (progressEvent.loaded / (progressEvent.total ?? 1)) * 100,
            ) +
            "%",
        );
      },
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    } else {
      const data = response.data as Blob;
      download(data, "subscribers.xlsx");
    }
  },
);

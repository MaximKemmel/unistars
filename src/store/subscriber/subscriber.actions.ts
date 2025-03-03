import { createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";
import download from "downloadjs";

import axios from "../../utils/axios.js";

export const getSubscribersList = createAsyncThunk(
  "api/getSubscribers",
  async ({ universityId }: { universityId: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/subscribers?universityId=${universityId}`,
        {
          params: {
            afterDate: "2020-01-01",
            beforeDate: format(new Date(), "yyyy-MM-dd"),
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getSubscribersFile = createAsyncThunk(
  "api/getSubscribersFile",
  async (_, { rejectWithValue }) => {
    try {
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
      const data = response.data as Blob;
      download(data, "subscribers.xlsx");
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";

import axios from "../../utils/axios.js";

export const getSubscribersList = createAsyncThunk(
  "api/getSubscribers",
  async ({ universityId }: { universityId: number }, { rejectWithValue }) => {
    const response = await axios.get(
      `/subscribers?universityId=${universityId}`,
      {
        params: {
          afterDate: "01.01.2020",
          beforeDate: format(new Date(), "dd.MM.yyyy"),
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
    await axios
      .get("/download_subscribers", {
        params: {
          afterDate: "01.01.2020",
          beforeDate: format(new Date(), "dd.MM.yyyy"),
        },
      })
      .then((response) => {
        console.log(response);
        const updatedContentType = `data:${response.data.contentType};base64,`;
        const fileDownloadElement = document.createElement("a");
        document.body.appendChild(fileDownloadElement);
        fileDownloadElement.download = `${response.data.fileName}`;
        fileDownloadElement.href = updatedContentType + response.data.fileData;
        fileDownloadElement.setAttribute("style", "display:none;");
        fileDownloadElement.target = "_blank";
        fileDownloadElement.click();
        document.body.removeChild(fileDownloadElement);
      })
      .catch((_) => {
        rejectWithValue("Server error");
      });
  },
);

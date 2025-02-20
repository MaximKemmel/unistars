import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios.js";

import { IEvent } from "../../types/event/event";

export const getEventList = createAsyncThunk(
  "api/getEventList",
  async (_, { rejectWithValue }) => {
    const response = await axios.get("/get_university_events");
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const getEventTypes = createAsyncThunk(
  "api/getEventTypes",
  async (_, { rejectWithValue }) => {
    const response = await axios.get("/eventTypes");
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const postEvent = createAsyncThunk(
  "api/postEvent",
  async ({ event }: { event: IEvent }, { rejectWithValue }) => {
    const response = await axios.post("/create_event", {
      description: event.description,
      name: event.name,
      startDate: event.startDate,
      address: event.address,
      link: event.link,
      coverUrl: event.coverUrl,
      privacy: event.privacy,
      eventTypeId: event.eventType ? event.eventType.id : -1,
      enabledChat: false,
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const patchEvent = createAsyncThunk(
  "api/patchEvent",
  async ({ event }: { event: IEvent }, { rejectWithValue }) => {
    const response = await axios.patch("/edit_event", {
      id: event.id,
      description: event.description,
      name: event.name,
      startDate: event.startDate,
      address: event.address,
      link: event.link,
      coverUrl: event.coverUrl,
      privacy: event.privacy,
      eventTypeId: event.eventType ? event.eventType.id : -1,
      enabledChat: false,
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

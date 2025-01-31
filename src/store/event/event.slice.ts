import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getEventList,
  getEventTypes,
  patchEvent,
  postEvent,
} from "./event.actions";

import { IEventType } from "../../types/event/eventType";
import { IEvent } from "../../types/event/event";
import { ApiStatusType } from "../../enums/local/apiStatusType";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";

interface IEventState {
  eventList: IEvent[];
  eventTypes: IEventType[];
  getEventListStatus: IApiStatus;
  getEventTypesStatus: IApiStatus;
  postEventStatus: IApiStatus;
  patchEventStatus: IApiStatus;
}

const initialState: IEventState = {
  eventList: [] as IEvent[],
  eventTypes: [] as IEventType[],
  getEventListStatus: initApiStatus(),
  getEventTypesStatus: initApiStatus(),
  postEventStatus: initApiStatus(),
  patchEventStatus: initApiStatus(),
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setGetEventListStatus(state, action: PayloadAction<IApiStatus>) {
      state.getEventListStatus = action.payload;
    },
    setGetEventTypesStatus(state, action: PayloadAction<IApiStatus>) {
      state.getEventTypesStatus = action.payload;
    },
    setPostEventStatus(state, action: PayloadAction<IApiStatus>) {
      state.postEventStatus = action.payload;
    },
    setPatchEventStatus(state, action: PayloadAction<IApiStatus>) {
      state.patchEventStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region Event types
    builder.addCase(getEventList.pending, (state) => {
      state.getEventListStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getEventList.fulfilled, (state, action) => {
      state.eventList = [];
      state.eventList = action.payload as IEvent[];
      state.getEventListStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getEventList.rejected, (state, action) => {
      state.eventList = [];
      state.getEventListStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Event types
    builder.addCase(getEventTypes.pending, (state) => {
      state.getEventTypesStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getEventTypes.fulfilled, (state, action) => {
      state.eventTypes = [];
      const response = action.payload;
      state.eventTypes = response.dictionary as IEventType[];
      state.getEventTypesStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getEventTypes.rejected, (state, action) => {
      state.eventTypes = [];
      state.getEventTypesStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Post event
    builder.addCase(postEvent.pending, (state) => {
      state.postEventStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(postEvent.fulfilled, (state) => {
      state.postEventStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(postEvent.rejected, (state, action) => {
      state.postEventStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Patch event
    builder.addCase(patchEvent.pending, (state) => {
      state.patchEventStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(patchEvent.fulfilled, (state) => {
      state.patchEventStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(patchEvent.rejected, (state, action) => {
      state.patchEventStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = eventSlice;

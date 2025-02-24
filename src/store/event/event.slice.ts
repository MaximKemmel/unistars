import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getEventList,
  getEventTypes,
  editEvent,
  postEvent,
  deleteEvent,
  uploadEventCover,
} from "./event.actions";

import { IEventType } from "../../types/event/eventType";
import { IEvent } from "../../types/event/event";
import { ApiStatusType } from "../../enums/local/apiStatusType";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";

interface IEventState {
  eventList: IEvent[];
  eventTypes: IEventType[];
  eventCover: string;
  getEventListStatus: IApiStatus;
  getEventTypesStatus: IApiStatus;
  postStatus: IApiStatus;
  editStatus: IApiStatus;
  deleteStatus: IApiStatus;
  uploadCoverStatus: IApiStatus;
}

const initialState: IEventState = {
  eventList: [] as IEvent[],
  eventTypes: [] as IEventType[],
  eventCover: "",
  getEventListStatus: initApiStatus(),
  getEventTypesStatus: initApiStatus(),
  postStatus: initApiStatus(),
  editStatus: initApiStatus(),
  deleteStatus: initApiStatus(),
  uploadCoverStatus: initApiStatus(),
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
      state.postStatus = action.payload;
    },
    setPatchEventStatus(state, action: PayloadAction<IApiStatus>) {
      state.editStatus = action.payload;
    },
    setDeleteEventStatus(state, action: PayloadAction<IApiStatus>) {
      state.deleteStatus = action.payload;
    },
    setUploadCoverStatus(state, action: PayloadAction<IApiStatus>) {
      state.uploadCoverStatus = action.payload;
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
      state.postStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(postEvent.fulfilled, (state) => {
      state.postStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(postEvent.rejected, (state, action) => {
      state.postStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Patch event
    builder.addCase(editEvent.pending, (state) => {
      state.editStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(editEvent.fulfilled, (state) => {
      state.editStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(editEvent.rejected, (state, action) => {
      state.editStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Delete event
    builder.addCase(deleteEvent.pending, (state) => {
      state.deleteStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(deleteEvent.fulfilled, (state) => {
      state.deleteStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.deleteStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Upload cover
    builder.addCase(uploadEventCover.pending, (state) => {
      state.uploadCoverStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(uploadEventCover.fulfilled, (state, action) => {
      state.uploadCoverStatus = { status: ApiStatusType.SUCCESS };
      state.eventCover = action.payload;
    });
    builder.addCase(uploadEventCover.rejected, (state, action) => {
      state.uploadCoverStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = eventSlice;

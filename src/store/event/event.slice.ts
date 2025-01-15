import {createSlice} from "@reduxjs/toolkit";
import {ApiStatusType} from "src/enums/local/apiStatusType";
import {IApiStatus, initApiStatus} from "src/types/local/apiStatus";

import { getEventTypes } from "./event.actions";

import {IEventType} from "../../types/event/eventType";

interface IEventState {
  eventTypes: IEventType[];
  getEventTypesStatus: IApiStatus;
}

const initialState: IEventState = {
  eventTypes: [] as IEventType[],
  getEventTypesStatus: initApiStatus(),
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#region Event types
    builder.addCase(getEventTypes.pending, (state) => {
      state.getEventTypesStatus = {status: ApiStatusType.IN_PROGRESS};
    });
    builder.addCase(getEventTypes.fulfilled, (state, action) => {
      state.eventTypes = [];
      state.eventTypes = action.payload as IEventType[];
      state.getEventTypesStatus = {status: ApiStatusType.SUCCESS};
    });
    builder.addCase(getEventTypes.rejected, (state, action) => {
      state.eventTypes = [];
      state.getEventTypesStatus = {status: ApiStatusType.ERROR, error: action.payload as string};
    });
    //#endregion
  },
});

export const {reducer} = eventSlice;

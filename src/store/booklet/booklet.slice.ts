import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getBookletList,
  postBooklet,
  editBooklet,
  deleteBooklet,
} from "./booklet.actions";

import { IBooklet } from "../../types/booklet/booklet";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IBookletState {
  booklets: IBooklet[];
  getStatus: IApiStatus;
  postStatus: IApiStatus;
  editStatus: IApiStatus;
  deleteStatus: IApiStatus;
}

const initialState: IBookletState = {
  booklets: [] as IBooklet[],
  getStatus: initApiStatus(),
  postStatus: initApiStatus(),
  editStatus: initApiStatus(),
  deleteStatus: initApiStatus(),
};

export const bookletSlice = createSlice({
  name: "booklet",
  initialState,
  reducers: {
    setGetStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
    setPostStatus(state, action: PayloadAction<IApiStatus>) {
      state.postStatus = action.payload;
    },
    setEditStatus(state, action: PayloadAction<IApiStatus>) {
      state.editStatus = action.payload;
    },
    setDeleteStatus(state, action: PayloadAction<IApiStatus>) {
      state.deleteStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region Booklets list
    builder.addCase(getBookletList.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getBookletList.fulfilled, (state, action) => {
      state.booklets = [];
      state.booklets = action.payload as IBooklet[];
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getBookletList.rejected, (state, action) => {
      state.booklets = [];
      state.getStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Post booklet
    builder.addCase(postBooklet.pending, (state) => {
      state.postStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(postBooklet.fulfilled, (state, action) => {
      const newBooklet = action.payload as IBooklet;
      if (newBooklet) {
        state.booklets.push(newBooklet);
        state.postStatus = { status: ApiStatusType.SUCCESS };
      } else {
        state.postStatus = { status: ApiStatusType.ERROR };
      }
    });
    builder.addCase(postBooklet.rejected, (state, action) => {
      state.postStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Edit booklet
    builder.addCase(editBooklet.pending, (state) => {
      state.editStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(editBooklet.fulfilled, (state, action) => {
      const updatedBooklet = action.payload as IBooklet;
      if (updatedBooklet) {
        state.booklets = state.booklets.map((booklet: IBooklet) =>
          booklet.id === updatedBooklet.id ? updatedBooklet : booklet,
        );
        state.editStatus = { status: ApiStatusType.SUCCESS };
      } else {
        state.editStatus = { status: ApiStatusType.ERROR };
      }
    });
    builder.addCase(editBooklet.rejected, (state, action) => {
      state.editStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Delete booklet
    builder.addCase(deleteBooklet.pending, (state) => {
      state.deleteStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(deleteBooklet.fulfilled, (state) => {
      state.deleteStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(deleteBooklet.rejected, (state, action) => {
      state.deleteStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = bookletSlice;

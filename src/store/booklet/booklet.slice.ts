import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getBookletList,
  postBooklet,
  editBooklet,
  deleteBooklet,
  uploadBookletCover,
  uploadBookletFile,
  rollbackDeleteBooklet,
} from "./booklet.actions";

import { IBooklet } from "../../types/booklet/booklet";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IBookletState {
  booklets: IBooklet[];
  bookletCover: string;
  bookletFile: string;
  rollbackId: number;
  getStatus: IApiStatus;
  postStatus: IApiStatus;
  editStatus: IApiStatus;
  deleteStatus: IApiStatus;
  rollbackDeleteStatus: IApiStatus;
  uploadCoverStatus: IApiStatus;
  uploadFileStatus: IApiStatus;
}

const initialState: IBookletState = {
  booklets: [] as IBooklet[],
  bookletCover: "",
  bookletFile: "",
  rollbackId: -1,
  getStatus: initApiStatus(),
  postStatus: initApiStatus(),
  editStatus: initApiStatus(),
  deleteStatus: initApiStatus(),
  rollbackDeleteStatus: initApiStatus(),
  uploadCoverStatus: initApiStatus(),
  uploadFileStatus: initApiStatus(),
};

export const bookletSlice = createSlice({
  name: "booklet",
  initialState,
  reducers: {
    setPostBookletStatus(state, action: PayloadAction<IApiStatus>) {
      state.postStatus = action.payload;
    },
    setEditBookletStatus(state, action: PayloadAction<IApiStatus>) {
      state.editStatus = action.payload;
    },
    setDeleteBookletStatus(state, action: PayloadAction<IApiStatus>) {
      state.deleteStatus = action.payload;
    },
    setRollbackDeleteBookletStatus(state, action: PayloadAction<IApiStatus>) {
      state.rollbackDeleteStatus = action.payload;
    },
    setUploadCoverStatus(state, action: PayloadAction<IApiStatus>) {
      state.uploadCoverStatus = action.payload;
    },
    setUploadFileStatus(state, action: PayloadAction<IApiStatus>) {
      state.uploadFileStatus = action.payload;
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
    builder.addCase(deleteBooklet.fulfilled, (state, acton) => {
      state.rollbackId = -1;
      const status = acton.payload;
      state.rollbackId = status.delayMethodId;
      state.deleteStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(deleteBooklet.rejected, (state, action) => {
      state.deleteStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Rollback delete booklet
    builder.addCase(rollbackDeleteBooklet.pending, (state) => {
      state.rollbackDeleteStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(rollbackDeleteBooklet.fulfilled, (state) => {
      state.rollbackDeleteStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(rollbackDeleteBooklet.rejected, (state, action) => {
      state.rollbackDeleteStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Upload cover
    builder.addCase(uploadBookletCover.pending, (state) => {
      state.uploadCoverStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(uploadBookletCover.fulfilled, (state, action) => {
      state.uploadCoverStatus = { status: ApiStatusType.SUCCESS };
      state.bookletCover = action.payload;
    });
    builder.addCase(uploadBookletCover.rejected, (state, action) => {
      state.uploadCoverStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Upload file
    builder.addCase(uploadBookletFile.pending, (state) => {
      state.uploadFileStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(uploadBookletFile.fulfilled, (state, action) => {
      state.uploadFileStatus = { status: ApiStatusType.SUCCESS };
      state.bookletFile = action.payload;
    });
    builder.addCase(uploadBookletFile.rejected, (state, action) => {
      console.log(action.payload);
      state.uploadFileStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = bookletSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getUniversityProfile,
  editUniversityProfile,
  uploadToGallery,
} from "./university.actions";

import { IUniversity } from "../../types/university/university";
import { initUniversity } from "../../types/university/initUniversity";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ApiStatusType } from "../../enums/local/apiStatusType";

interface IUniversityState {
  universityProfile: IUniversity;
  getStatus: IApiStatus;
  editStatus: IApiStatus;
  uploadToGalleryStatus: IApiStatus;
}

const initialState: IUniversityState = {
  universityProfile: initUniversity(),
  getStatus: initApiStatus(),
  editStatus: initApiStatus(),
  uploadToGalleryStatus: initApiStatus(),
};

export const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {
    setGetUniversityStatus(state, action: PayloadAction<IApiStatus>) {
      state.getStatus = action.payload;
    },
    setEditUniversityStatus(state, action: PayloadAction<IApiStatus>) {
      state.editStatus = action.payload;
    },
    setUploadToGalleryStatus(state, action: PayloadAction<IApiStatus>) {
      state.uploadToGalleryStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region University Profile
    builder.addCase(getUniversityProfile.pending, (state) => {
      state.getStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getUniversityProfile.fulfilled, (state, action) => {
      state.universityProfile = initUniversity();
      let tmpUniversityProfile = action.payload as IUniversity;
      if (tmpUniversityProfile) {
        if (
          tmpUniversityProfile.linksSocialNetwork === undefined ||
          !Array.isArray(tmpUniversityProfile.linksSocialNetwork) ||
          tmpUniversityProfile.linksSocialNetwork?.length === 0
        ) {
          tmpUniversityProfile = {
            ...tmpUniversityProfile,
            linksSocialNetwork: ["", ""],
          };
        }
        if (tmpUniversityProfile.linksSocialNetwork?.length === 1) {
          tmpUniversityProfile = {
            ...tmpUniversityProfile,
            linksSocialNetwork: [
              tmpUniversityProfile.linksSocialNetwork[0],
              "",
            ],
          };
        }
      }
      state.universityProfile = tmpUniversityProfile;
      state.getStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getUniversityProfile.rejected, (state, action) => {
      state.universityProfile = initUniversity();
      state.getStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region University Profile
    builder.addCase(editUniversityProfile.pending, (state) => {
      state.editStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(editUniversityProfile.fulfilled, (state) => {
      state.editStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(editUniversityProfile.rejected, (state, action) => {
      state.editStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Upload to gallery
    builder.addCase(uploadToGallery.pending, (state) => {
      state.uploadToGalleryStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(uploadToGallery.fulfilled, (state) => {
      state.uploadToGalleryStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(uploadToGallery.rejected, (state, action) => {
      state.uploadToGalleryStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { actions, reducer } = universitySlice;

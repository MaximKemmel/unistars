import { createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";

import axios from "../../utils/axios.js";

import { IUniversity } from "../../types/university/university";
import { ICountry } from "../../types/core/country";

export const getUniversityProfile = createAsyncThunk(
  "api/getUniversityProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/university_profile`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const editUniversityProfile = createAsyncThunk(
  "api/editUniversityProfile",
  async ({ university }: { university: IUniversity }, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/edit_university_profile", {
        name: university.name,
        foundation:
          university.foundation !== null && university.foundation !== undefined
            ? format(university.foundation, "yyyy-MM-dd")
            : null,
        description: university.description,
        logoUrl: university.logoUrl,
        universityLink: university.universityLink,
        latitude:
          university.geoLocation !== null &&
          university.geoLocation !== undefined
            ? university.geoLocation?.coordinates[0]
            : null,
        longitude:
          university.geoLocation !== null &&
          university.geoLocation !== undefined
            ? university.geoLocation?.coordinates[1]
            : null,
        userCityId:
          university.userCity !== null && university.userCity !== undefined
            ? university.userCity.id
            : null,
        street: university.street,
        houseNumber: university.houseNumber,
        admission: university.admission,
        careers: university.careers,
        phoneNumberBody: university.phoneNumberBody,
        phoneNumberCountryPrefix: university.phoneNumberCountryPrefix,
        userCountriesIds:
          university.userCountries != undefined &&
          Array.isArray(university.userCountries)
            ? university.userCountries.map((country: ICountry) => country.id)
            : [],
        linksSocialNetwork: university.linksSocialNetwork,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const uploadToGallery = createAsyncThunk(
  "uploadToGallery",
  async (
    {
      file,
      onUploadProgress,
    }: {
      file: Blob;
      onUploadProgress: Function;
    },
    { rejectWithValue },
  ) => {
    try {
      const formData = new FormData();
      formData.append("type", "IMAGE");
      formData.append("files", file);
      const response = await axios.post("/upload_to_gallery", formData, {
        onUploadProgress: (data) => onUploadProgress(data),
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

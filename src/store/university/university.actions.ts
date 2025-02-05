import { createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";

import axios from "../../utils/axios.js";

import { IUniversity } from "../../types/university/university";
import { ICountry } from "../../types/core/country";

export const getUniversityProfile = createAsyncThunk(
  "api/getUniversityProfile",
  async (_, { rejectWithValue }) => {
    const response = await axios.get(`/university_profile`);
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

export const editUniversityProfile = createAsyncThunk(
  "api/editUniversityProfile",
  async ({ university }: { university: IUniversity }, { rejectWithValue }) => {
    const response = await axios.patch("/edit_university_profile", {
      name: university.name,
      foundation:
        university.foundation !== null && university.foundation !== undefined
          ? format(university.foundation, "dd.MM.yyyy")
          : null,
      description: university.description,
      logoUrl: university.logoUrl,
      universityLink: university.universityLink,
      latitude:
        university.geoLocation !== null && university.geoLocation !== undefined
          ? university.geoLocation?.coordinates[0]
          : null,
      longitude:
        university.geoLocation !== null && university.geoLocation !== undefined
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
    });
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
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
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios
      .post("/upload_to_gallery", formData, {
        onUploadProgress: (data) => onUploadProgress(data),
      })
      .then((response) => response.data);
    if (response.status !== 200) {
      throw rejectWithValue("Server error!");
    }
    return response.data;
  },
);

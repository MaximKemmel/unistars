import { createSlice } from "@reduxjs/toolkit";
import { getCities, getCountries, getLanguages } from "./core.actions";

import { ApiStatusType } from "../../enums/local/apiStatusType";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ICountry } from "../../types/core/country";
import { ICity } from "../../types/core/city";
import { ILanguage } from "../../types/core/language";

interface ICoreState {
  countries: ICountry[];
  cities: ICity[];
  languages: ILanguage[];
  getCountriesStatus: IApiStatus;
  getCitiesStatus: IApiStatus;
  getLanguagesStatus: IApiStatus;
}

const initialState: ICoreState = {
  countries: [] as ICountry[],
  cities: [] as ICity[],
  languages: [] as ILanguage[],
  getCountriesStatus: initApiStatus(),
  getCitiesStatus: initApiStatus(),
  getLanguagesStatus: initApiStatus(),
};

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#region Countries
    builder.addCase(getCountries.pending, (state) => {
      state.getCountriesStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = [];
      const response = action.payload;
      state.countries = response.dictionary as ICountry[];
      state.getCountriesStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      state.countries = [];
      state.getCountriesStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Cities
    builder.addCase(getCities.pending, (state) => {
      state.getCitiesStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.cities = [];
      const response = action.payload;
      state.cities = response.dictionary as ICity[];
      state.getCitiesStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getCities.rejected, (state, action) => {
      state.cities = [];
      state.getCitiesStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion

    //#region Languages
    builder.addCase(getLanguages.pending, (state) => {
      state.getLanguagesStatus = { status: ApiStatusType.IN_PROGRESS };
    });
    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.languages = [];
      const response = action.payload;
      state.languages = response.dictionary as ILanguage[];
      state.getLanguagesStatus = { status: ApiStatusType.SUCCESS };
    });
    builder.addCase(getLanguages.rejected, (state, action) => {
      state.languages = [];
      state.getLanguagesStatus = {
        status: ApiStatusType.ERROR,
        error: action.payload as string,
      };
    });
    //#endregion
  },
});

export const { reducer } = coreSlice;

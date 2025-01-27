import { createSlice } from "@reduxjs/toolkit";
import { getCities, getCountries } from "./core.actions";

import { ApiStatusType } from "../../enums/local/apiStatusType";
import { IApiStatus, initApiStatus } from "../../types/local/apiStatus";
import { ICountry } from "../../types/core/country";
import { ICity } from "../../types/core/city";

interface ICoreState {
  countries: ICountry[];
  cities: ICity[];
  getCountriesStatus: IApiStatus;
  getCitiesStatus: IApiStatus;
}

const initialState: ICoreState = {
  countries: [] as ICountry[],
  cities: [] as ICity[],
  getCountriesStatus: initApiStatus(),
  getCitiesStatus: initApiStatus(),
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
      state.countries = action.payload as ICountry[];
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
  },
});

export const { reducer } = coreSlice;

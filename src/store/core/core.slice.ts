import { createSlice } from "@reduxjs/toolkit";

import { getCities, getCountries } from "./core.actions";

import { ICountry } from "../../types/core/country";
import { ICity } from "../../types/core/city";

interface ICoreState {
  countries: ICountry[];
  cities: ICity[];
}

const initialState: ICoreState = {
  countries: [] as ICountry[],
  cities: [] as ICity[],
};

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#region Countries
    builder.addCase(getCountries.pending, (_state) => {});
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = [];
      state.countries = action.payload as ICountry[];
    });
    builder.addCase(getCountries.rejected, (state) => {
      state.countries = [];
    });
    //#endregion

    //#region Cities
    builder.addCase(getCities.pending, (_state) => {});
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.cities = [];
      state.cities = action.payload as ICity[];
    });
    builder.addCase(getCities.rejected, (state) => {
      state.cities = [];
    });
    //#endregion
  },
});

export const { reducer } = coreSlice;

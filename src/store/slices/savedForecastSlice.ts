import { createSlice } from "@reduxjs/toolkit";
import { getDataFromLS } from "../../helpers/getDataFromLS";
import { CityForecast } from "../../types/types";

const initialState: any = {
	savedForecast: getDataFromLS("savedForecast"),
};

const savedForecastSlice = createSlice({
	name: "savedForecast",
	initialState,
	reducers: {
		addCityForecast(state, action) {
			const foundCity = state.savedForecast.some(
				(city: CityForecast) => city.id === action.payload.id,
			);
			if (foundCity) return;
			state.savedForecast.push(action.payload);
			localStorage.setItem(
				"savedForecast",
				JSON.stringify(state.savedForecast),
			);
		},
		deleteCityForecast(state, action) {
			state.savedForecast = state.savedForecast.filter(
				(city: CityForecast) => city.id !== action.payload.id,
			);
			localStorage.setItem(
				"savedForecast",
				JSON.stringify(state.savedForecast),
			);
		},
		updateCityForecast(state, action) {
			let newCityForecast = action.payload.payload;
			let idx = state.savedForecast.findIndex(
				(city: CityForecast) => city.id === newCityForecast.id,
			);

			state.savedForecast.splice(idx, 1, newCityForecast);

			localStorage.setItem(
				"savedForecast",
				JSON.stringify(state.savedForecast),
			);
		},
	},
});

export const { addCityForecast, deleteCityForecast, updateCityForecast } =
	savedForecastSlice.actions;
export default savedForecastSlice.reducer;

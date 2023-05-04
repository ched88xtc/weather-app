import { createSlice } from "@reduxjs/toolkit";
import { fetchWeatherForecast } from "../../api/fetchWeatherForecast";
import { CityForecast } from "../../types/types";

const initialState: any = {
	forecast: [],
};

const weatherSlice = createSlice({
	name: "forecast",
	initialState,
	reducers: {
		deleteForecast(state, action) {
			state.forecast = state.forecast.filter(
				(e: CityForecast) => e.id !== action.payload.id,
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchWeatherForecast.fulfilled, (state, action) => {
			state.forecast.push(action.payload);
		});
	},
});

export const { deleteForecast } = weatherSlice.actions;
export default weatherSlice.reducer;

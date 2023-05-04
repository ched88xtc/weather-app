import type {} from "redux-thunk/extend-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoadOption } from "../types/types";

export const fetchWeatherForecast = createAsyncThunk(
	"forecast/fetchWeatherForecast",
	async function (option: LoadOption) {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${option.lat}&lon=${option.lon}&units=metric&appid=5a3bfb380535540d55afe863c9a2ebe0`,
		);

		const data = await response.json();

		const forecastData = {
			...data.city,
			list: data.list.slice(0, 16),
		};
		return forecastData;
	},
);

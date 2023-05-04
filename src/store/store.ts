import { configureStore } from "@reduxjs/toolkit";
import savedForecastReducer from "./slices/savedForecastSlice";
import WeatherReducer from "./slices/WeatherSlice";

export default configureStore({
	reducer: {
		savedForecast: savedForecastReducer,
		forecast: WeatherReducer,
	},
});

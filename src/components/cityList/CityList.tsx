import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CityCard } from "../cityCard/CityCard";
import { AddCityCard } from "../addCityCard/AddCityCard";
import { CityForecast, LoadOption, RootState } from "../../types/types";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteForecast } from "../../store/slices/WeatherSlice";
import { fetchWeatherForecast } from "../../api/fetchWeatherForecast";
import { updateCityForecast } from "../../store/slices/savedForecastSlice";

const useStyles = makeStyles((theme) => ({
	pageContainer: {
		padding: 40,
	},
}));

export const CityList: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const styles = useStyles();

	const savedForecast = useSelector(
		(state: RootState) => state.savedForecast.savedForecast,
	);

	const updateSavedForecast = () => {
		for (const el in savedForecast) {
			const city = savedForecast[el];
			const option: LoadOption = {
				country: city.country,
				name: city.name,
				lat: city.coord.lat,
				lon: city.coord.lon,
			};

			dispatch(deleteForecast(city));

			dispatch(fetchWeatherForecast(option)).then((data) =>
				dispatch(updateCityForecast(data)),
			);
		}
	};

	useEffect(() => {
		updateSavedForecast();
	}, []);

	return (
		<Container className={styles.pageContainer} maxWidth="md">
			<Grid container spacing={3} justifyContent="flex-start">
				<Grid item xs={12} sm={6} md={4}>
					<AddCityCard />
				</Grid>
				{savedForecast.map((city: CityForecast) => (
					<Grid item key={city.id} xs={12} sm={6} md={4}>
						<CityCard city={city} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

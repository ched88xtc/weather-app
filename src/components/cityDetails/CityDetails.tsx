import React from "react";
import { CityForecast, RootState } from "../../types/types";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	Container,
	Grid,
	IconButton,
	Typography,
	makeStyles,
} from "@material-ui/core";
import { CancelOutlined } from "@material-ui/icons";
import { Tile } from "../tile/Tile";

import { getSunTime } from "../../helpers/getSunTime";
import { getWindDirection } from "../../helpers/getWindDirection";
import { getHumidityValue } from "../../helpers/getHumidityValue";
import { getPop } from "../../helpers/getPop";
import { getVisibilityValue } from "../../helpers/getVisibilityValue";

import sunriseImg from "../../assets/icons/sunrise.png";
import sunsetImg from "../../assets/icons/sunset.png";
import wind from "../../assets/icons/wind.png";
import feels from "../../assets/icons/feels.png";
import humidity from "../../assets/icons/humidity.png";
import visibility from "../../assets/icons/visibility.png";
import pressure from "../../assets/icons/pressure.png";
import pop from "../../assets/icons/precipitation.png";

const useStyles = makeStyles((theme) => ({
	detailsContainer: {
		padding: 20,
		maxWidth: 600,
		boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
		backgroundColor: "rgba(165, 165, 165, .25)",
		backdropFilter: "blur(5px)",
	},
	weatherImg: {
		alignSelf: "center",
		width: 100,
		height: 100,
	},
	imgContainer: {
		display: "flex",
		justifyContent: "center",
	},
	forecastContainer: {
		width: "80%",
		padding: 10,
		display: "flex",
		overflowX: "scroll",
		gap: 10,
	},
	forecastItemContainer: {
		width: 80,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	sunBlockContainer: {
		padding: 20,
		gap: 10,
		minWidth: 165,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
		backgroundColor: "rgba( 255, 255, 255, .10)",
		backdropFilter: "blur(5px)",
		borderRadius: 15,
	},
	gridContainer: {
		gap: 10,
		padding: 60,
		maxWidth: 700,
	},
	backButton: {
		padding: "10px",
		color: "#e24a4a",
	},
}));

export const CityDetails = (): JSX.Element => {
	const styles = useStyles();

	const { cityName } = useParams();
	const cityForecast = useSelector(
		(state: RootState) => state.savedForecast.savedForecast,
	).find((city: CityForecast) => city.name === cityName);
	const today = cityForecast?.list[0];
	const todayWeatherDesc = today
		? today?.weather[0].description.charAt(0).toUpperCase() +
		  today?.weather[0].description.slice(1)
		: "";

	return (
		<>
			<Container className={styles.detailsContainer}>
				<Link to="/">
					<IconButton className={styles.backButton}>
						<CancelOutlined fontSize="large" aria-label="cancel-btn" />
					</IconButton>
				</Link>
				<Typography variant="h4" align="center">
					{cityForecast?.name}, <b>{cityForecast?.country}</b>
				</Typography>
				<Typography variant="h4" align="center">
					<b>{Math.round(today ? today.main.temp : 0)}</b>
					{"°С"}
				</Typography>
				<Container className={styles.imgContainer}>
					<img
						className={styles.weatherImg}
						src={`http://openweathermap.org/img/wn/${today?.weather[0].icon}@2x.png`}
						alt={`weather-icon-${today?.weather[0].description}`}
					></img>
				</Container>
				<Typography variant="h5" align="center">
					{todayWeatherDesc}
				</Typography>
				<Typography variant="subtitle1" align="center">
					H: <b>{today ? Math.round(today?.main.temp_max) : 0}°</b> L:{" "}
					<b>{today ? Math.round(today?.main.temp_min) : 0}°</b>
				</Typography>
				<Container className={styles.forecastContainer}>
					{cityForecast ? (
						cityForecast?.list.map((item, i) => (
							<Container className={styles.forecastItemContainer} key={i}>
								<Typography variant="subtitle1">
									{i === 0 ? <b>Now</b> : new Date(item.dt * 1000).getHours()}
								</Typography>
								<img
									src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
									alt={`weather-icon-${item.weather[0].description}`}
									width={70}
								></img>
								<Typography variant="subtitle1">
									{Math.round(item.main.temp)}°
								</Typography>
							</Container>
						))
					) : (
						<></>
					)}
				</Container>
				<Grid
					className={styles.gridContainer}
					container
					spacing={2}
					justifyContent="space-around"
				>
					<Grid item xs={12} sm={6} md={4}>
						<Container className={styles.sunBlockContainer}>
							<img src={sunriseImg} alt="sunrise-icon" width={40} />
							<Typography>
								{getSunTime(cityForecast ? cityForecast?.sunrise : 0)}
							</Typography>
						</Container>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Container className={styles.sunBlockContainer}>
							<img src={sunsetImg} alt="sunset-icon" width={40} />
							<Typography>
								{getSunTime(cityForecast ? cityForecast?.sunset : 0)}
							</Typography>
						</Container>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Tile
							iconPath={wind}
							title="Wind"
							info={`${Math.round(today ? today?.wind.speed : 0)} km/h`}
							description={`${getWindDirection(
								Math.round(today ? today?.wind.deg : 0),
							)}, gusts ${today?.wind.gust.toFixed(1)} km/h`}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Tile
							iconPath={feels}
							title="Feels like"
							info={`${Math.round(today ? today?.main.feels_like : 0)}°`}
							description={`Feels ${
								Math.round(today ? today?.main.feels_like : 0) <
								Math.round(today ? today?.main.temp : 0)
									? "colder"
									: "warmer"
							}`}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Tile
							iconPath={humidity}
							title="Humidity"
							info={`${today?.main.humidity} %`}
							description={getHumidityValue(today ? today?.main.humidity : 0)}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Tile
							iconPath={pop}
							title="Precipitation"
							info={`${Math.round(today ? today?.pop * 1000 : 0)}%`}
							description={`${getPop(today ? today.pop : 0)}`}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Tile
							iconPath={pressure}
							title="Pressure"
							info={`${today?.main.pressure} hPa`}
							description={`${
								Math.round(today ? today.main.pressure : 0) < 1013
									? "Lower"
									: "Higher"
							} than standard`}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Tile
							iconPath={visibility}
							title="Visibility"
							info={`${(today ? today?.visibility / 1000 : 0).toFixed()} km`}
							description={getVisibilityValue(today ? today?.visibility : 0)}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

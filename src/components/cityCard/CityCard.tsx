import React from "react";
import { CityForecast, LoadOption } from "../../types/types";
import { useDispatch } from "react-redux";
import {
	deleteCityForecast,
	updateCityForecast,
} from "../../store/slices/savedForecastSlice";
import {
	Button,
	Container,
	IconButton,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { fetchWeatherForecast } from "../../api/fetchWeatherForecast";
import { deleteForecast } from "../../store/slices/WeatherSlice";

interface CityCardProps {
	city: CityForecast;
}

const useStyles = makeStyles((theme) => ({
	cardContainer: {
		display: "flex",
		flexDirection: "column",
		maxWidth: 250,
		maxHeight: 350,
		padding: 15,
		boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
		backgroundColor: "rgba(165, 165, 165, .25)",
		backdropFilter: "blur(5px)",
		borderRadius: 15,
		gap: 5,
	},
	deleteButton: {
		position: "absolute",
		minWidth: 40,
		alignSelf: "flex-end",
	},
	detailsButton: {
		width: "100%",
	},
	typography: {
		alignSelf: "center",
	},
	typographyHeader: {
		marginTop: 15,
	},
	weatherImg: {
		alignSelf: "center",
		width: 100,
	},
}));

export const CityCard: React.FC<CityCardProps> = ({ city }) => {
	const dispatch = useDispatch();
	const styles = useStyles();

	const today = city.list[0];
	const todayWeatherDesc =
		today.weather[0].description.charAt(0).toUpperCase() +
		today.weather[0].description.slice(1);

	const updateForecast = () => {
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
	};

	return (
		<Container className={styles.cardContainer}>
			<IconButton
				aria-label="delete"
				color="primary"
				className={styles.deleteButton}
				onClick={() => {
					dispatch(deleteCityForecast(city));
				}}
			>
				<DeleteIcon />
			</IconButton>
			<Typography className={`${styles.typography} ${styles.typographyHeader}`}>
				<b>{city.name}</b>, {city.country}
			</Typography>
			<img
				className={styles.weatherImg}
				src={`http://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`}
				alt={`weather-icon-${today.weather[0].description}`}
			></img>
			<Typography variant="h6" className={styles.typography}>
				<b>{Math.round(today.main.temp)} °С</b>
			</Typography>
			<Typography className={styles.typography}>{todayWeatherDesc}</Typography>
			<Button variant="outlined" color="primary" onClick={updateForecast}>
				Refresh
			</Button>
			<Link to={`/forecast/${city.name}`}>
				<Button
					className={styles.detailsButton}
					variant="outlined"
					color="primary"
				>
					Details
				</Button>
			</Link>
		</Container>
	);
};

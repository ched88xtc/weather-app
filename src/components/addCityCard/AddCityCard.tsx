import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCityForecast } from "../../store/slices/savedForecastSlice";
import {
	Button,
	Container,
	IconButton,
	TextField,
	Typography,
	makeStyles,
} from "@material-ui/core";
import {
	AddCircleOutlineOutlined,
	AddOutlined,
	CancelOutlined,
} from "@material-ui/icons";
import { fetchWeatherForecast } from "../../api/fetchWeatherForecast";
import { CityForecast } from "../../types/types";

type LoadOption = {
	id: number;
	country: string;
	lat: number;
	lon: number;
	name: string;
};

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
	},
	tempCardContainer: {},
	searchContainer: {
		padding: 0,
		marginBottom: 8,
		height: 40,
		display: "flex",
		alignItems: "flex-end",
		gap: 10,
	},
	infoContainer: {
		padding: 0,
		display: "flex",
		flexDirection: "column",
		gap: 5,
	},
	buttonsContainer: {
		padding: 0,
		display: "flex",
		justifyContent: "space-between",
	},
	optionsList: {
		position: "absolute",
		top: 47,
		backgroundColor: "white",
	},
	weatherImg: {
		alignSelf: "center",
		width: 100,
		height: 100,
	},
	imgMock: {
		width: 100,
	},
	typography: {
		alignSelf: "flex-start",
	},
	button: {
		padding: 5,
	},
	submitButton: {
		height: 35,
	},
	addCardButton: {
		margin: "42% 20%",
		width: 100,
		height: 100,
		alignSelf: "center",
		border: "solid 1px #4050b5",
	},
	cancelButton: {
		color: "#e24a4a",
	},
}));

export const AddCityCard: React.FC = () => {
	const dispatch = useDispatch();
	const styles = useStyles();

	const [showButton, setShowButton] = useState<boolean>(true);
	const [inputValue, setInputValue] = useState<string>("");
	const [options, setOptions] = useState<[]>([]);
	const [tempCity, setTempCity] = useState<LoadOption | null>(null);

	const forecast = useSelector((state: any) => state.forecast.forecast).find(
		(e: CityForecast) =>
			e.coord.lat.toFixed(3) === tempCity?.lat.toFixed(3) &&
			e.coord.lon.toFixed(3) === tempCity?.lon.toFixed(3),
	);

	const loadOptions = (searchValue: string) => {
		fetch(
			`http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=3&appid=5a3bfb380535540d55afe863c9a2ebe0`,
		)
			.then((res) => res.json())
			.then((data) => setOptions(data));
	};

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim();

		setInputValue(value);

		if (value === "") {
			setOptions([]);
			return;
		}

		loadOptions(value);
	};

	const onOptionSelect = (option: LoadOption) => {
		setTempCity(option);
	};

	const onSearchSubmit = () => {
		if (!tempCity) return;

		dispatch(fetchWeatherForecast(tempCity));
	};

	useEffect(() => {
		if (tempCity) {
			setInputValue(tempCity.name);
			setOptions([]);
		}
	}, [tempCity]);

	const today = forecast?.list[0];
	const todayWeatherDesc =
		forecast?.list[0].weather[0].description.charAt(0).toUpperCase() +
		forecast?.list[0].weather[0].description.slice(1);

	return (
		<Container className={styles.cardContainer}>
			{showButton ? (
				<IconButton
					className={styles.addCardButton}
					color="primary"
					onClick={() => {
						setShowButton(!showButton);
					}}
				>
					<AddOutlined fontSize="large" />
				</IconButton>
			) : (
				<Container className={styles.tempCardContainer}>
					<Container className={styles.searchContainer}>
						<TextField
							id="standard-basic"
							autoComplete="off"
							label="City"
							value={inputValue}
							onChange={onSearchChange}
						/>
						<Button
							className={styles.submitButton}
							variant="contained"
							color="primary"
							onClick={onSearchSubmit}
						>
							Submit
						</Button>
					</Container>
					<ul className={styles.optionsList}>
						{options.map((option: LoadOption) => (
							<li key={option.lat + "" + option.lon}>
								<Button onClick={() => onOptionSelect(option)}>
									{`${option.name}, ${option.country}`}
								</Button>
							</li>
						))}
					</ul>
					<Container className={styles.infoContainer}>
						<Typography className={styles.typography}>
							City: {tempCity ? forecast?.name : ""}
						</Typography>
						{today ? (
							<img
								className={styles.weatherImg}
								src={`http://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`}
								alt={`weather-icon-${today.weather[0].description}`}
							></img>
						) : (
							<div className={styles.weatherImg}></div>
						)}
						<Typography className={styles.typography}>
							Temperature:{" "}
							{tempCity && today ? Math.round(today.main.temp) : ""}{" "}
							{today ? "°С" : ""}
						</Typography>
						<Typography className={styles.typography}>
							State: {tempCity && today ? todayWeatherDesc : ""}
						</Typography>
						<Container className={styles.buttonsContainer}>
							<IconButton
								className={styles.button}
								onClick={() => {
									if (inputValue === "" || !tempCity) return;
									dispatch(addCityForecast(forecast));
									setShowButton(!showButton);
									setInputValue("");
									setTempCity(null);
								}}
							>
								<AddCircleOutlineOutlined fontSize="large" color="primary" />
							</IconButton>
							<IconButton
								className={styles.button}
								onClick={() => {
									setShowButton(!showButton);
									setInputValue("");
									setOptions([]);
									setTempCity(null);
								}}
							>
								<CancelOutlined
									fontSize="large"
									className={styles.cancelButton}
								/>
							</IconButton>
						</Container>
					</Container>
				</Container>
			)}
		</Container>
	);
};

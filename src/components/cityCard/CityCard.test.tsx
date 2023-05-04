import { fireEvent, render, screen } from "@testing-library/react";
import { CityCard } from "./CityCard";
import { CityForecast } from "../../types/types";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store/store";

describe("CityCard", () => {
	const city: CityForecast = {
		id: 1,
		name: "London",
		country: "GB",
		coord: { lat: 51.5072, lon: -0.1276 },
		sunrise: Date.now(),
		sunset: Date.now(),
		list: [
			{
				dt: Date.now(),
				main: {
					feels_like: 5,
					humidity: 80,
					pressure: 1015,
					temp: 10,
					temp_max: 12,
					temp_min: 8,
				},
				weather: [
					{
						main: "Clouds",
						icon: "02d",
						description: "few clouds",
					},
				],
				wind: {
					speed: 3.1,
					deg: 280,
					gust: 10.6,
				},
				clouds: {
					all: 20,
				},
				pop: 0.1,
				visibility: 10000,
			},
		],
	};

	it("links to forecast details page on details button click", () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<CityCard city={city} />
				</BrowserRouter>
			</Provider>,
		);

		fireEvent.click(screen.getByText("Details"));

		expect(window.location.pathname).toContain("/forecast/London");
	});

	it("should render the component with the expected elements", () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<CityCard city={city} />
				</BrowserRouter>
			</Provider>,
		);
		expect(screen.getByText(city.name)).toBeInTheDocument();
		expect(screen.getByText(`, ${city.country}`)).toBeInTheDocument();
		expect(
			screen.getByText(`${Math.round(city.list[0].main.temp)} °С`),
		).toBeInTheDocument();
		expect(
			screen.getByAltText(
				`weather-icon-${city.list[0].weather[0].description}`,
			),
		).toBeInTheDocument();
		expect(screen.getByText("Refresh")).toBeInTheDocument();
		expect(screen.getByText("Details")).toBeInTheDocument();
	});
});

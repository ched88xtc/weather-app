import { fireEvent, render, screen } from "@testing-library/react";
import { CityDetails } from "./CityDetails";
import { Provider } from "react-redux";
import store from "../../store/store";
import { BrowserRouter } from "react-router-dom";

describe("CityDetails", () => {
	it("renders CityDetails component", () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<CityDetails />
				</BrowserRouter>
			</Provider>,
		);
	});

	it("clicking on back button redirects to home page", () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<CityDetails />
				</BrowserRouter>
			</Provider>,
		);

		fireEvent.click(screen.getByLabelText("cancel-btn"));

		expect(window.location.pathname).toBe("/weather-app");
	});
});

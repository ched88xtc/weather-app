import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { AddCityCard } from "./AddCityCard";
import store from "../../store/store";
import { BrowserRouter } from "react-router-dom";

describe("AddCityCard", () => {
	it("should render a button by default", () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<AddCityCard />
				</BrowserRouter>
			</Provider>,
		);

		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("should show a form when button is clicked", () => {
		render(
			<Provider store={store}>
				<AddCityCard />
			</Provider>,
		);

		fireEvent.click(screen.getByRole("button"));

		expect(screen.getByLabelText(/city/i)).toBeInTheDocument();

		expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
	});
});

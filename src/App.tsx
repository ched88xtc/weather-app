import React from "react";
import "./App.css";
import { CityList } from "./components/cityList/CityList";
import { Route, Routes } from "react-router-dom";
import { CityDetails } from "./components/cityDetails/CityDetails";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<CityList />} />
				<Route path="/forecast/:cityName" element={<CityDetails />} />
			</Routes>
		</div>
	);
}

export default App;

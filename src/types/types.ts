export type LoadOption = {
	country: string;
	lat: number;
	lon: number;
	name: string;
};

export type CityForecast = {
	coord: {
		lat: number;
		lon: number;
	};
	id: number;
	name: string;
	country: string;
	sunrise: number;
	sunset: number;
	list: [
		{
			dt: number;
			main: {
				feels_like: number;
				humidity: number;
				pressure: number;
				temp: number;
				temp_max: number;
				temp_min: number;
			};
			weather: [
				{
					main: string;
					icon: string;
					description: string;
				},
			];
			wind: {
				speed: number;
				gust: number;
				deg: number;
			};
			clouds: {
				all: number;
			};
			pop: number;
			visibility: number;
		},
	];
};

export interface RootState {
	savedForecast: {
		savedForecast: CityForecast[];
	};
}

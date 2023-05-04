const getDataFromLS = (key: string) => {
	const data: string | null = localStorage.getItem(key);
	if (data) {
		return JSON.parse(data);
	} else {
		return [];
	}
};

export { getDataFromLS };

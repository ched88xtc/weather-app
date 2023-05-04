export const getHumidityValue = (level: number): string => {
	if (level <= 55) return "Dry";
	if (level > 55 && level <= 65) return " Sticky feeling";

	return "Lots of moisture";
};

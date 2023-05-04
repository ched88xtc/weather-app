export const getWindDirection = (deg: number): string => {
	if (deg > 15 && deg <= 75) return "NE";

	if (deg > 75 && deg <= 105) return "E";
	if (deg > 105 && deg <= 165) return "SE";

	if (deg > 165 && deg <= 195) return "S";
	if (deg > 195 && deg <= 255) return "SW";

	if (deg > 255 && deg <= 285) return "W";
	if (deg > 285 && deg <= 345) return "NW";

	return "N";
};

export const getPop = (value: number): string => {
	if (value <= 0.33) return "Low probability";
	if (value > 0.33 && value <= 0.66) return "Moderate probability";

	return "High probability";
};

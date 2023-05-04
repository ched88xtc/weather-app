export const getVisibilityValue = (number: number): string => {
	if (number <= 50) return "Dangerously foggy";
	if (number > 50 && number <= 500) return "Expect heavy fog";
	if (number > 500 && number <= 2000) return "Expect some fog";
	if (number > 2000 && number <= 9000) return "Expect some haze";

	return "Very clear day";
};

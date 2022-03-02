export const convertCurrencyToSymbol = (currency) => {
	if (currency === "GBP") {
		return "£";
	}
	if (currency === "USD") {
		return "$";
	}
};
export const convertCurrencyToSymbol = (currency) => {
	if (currency === "GBP") {
		return "£";
	}
	if (currency === "USD") {
		return "$";
	}
};

export const buildFilter = (filter) => {
    let query = {};
    for (let keys in filter) {
        if (filter[keys].constructor === Array && filter[keys].length > 0) {
            query[keys] = filter[keys];
        }
    }
    return query;
};

export const filterData = (data, query) => {
    const filteredData = data.filter( (item) => {
        console.log(item, 'item in filterData');
        for (let key in query) {
            if (item.paymentMethods.toString().includes(query.paymentMethods)){
                return true;
            }
            if (item[key] === undefined || !query[key].includes(item[key])) {
                return false;
            }
        }
        return true;
    });
    return filteredData;
};
const key = 'f341c5aa8a6091cd451a8525cc820c84';

const requestCity = async (city) => {
	const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
	const query = `?q=${city}&appid=${key}`;

	// make fetch call(promise call)
	const response = await fetch(baseUrl + query);

	// promise data
	const data = await response.json();
	return data;
};

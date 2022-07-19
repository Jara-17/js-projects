// W E A T H E R	 A P P

const getWeatherData = (city) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial`;
	fetch(url)
	.then(response => response)
	.then(data => data.json())
	.then(data => showWeatherData(data))
};


const searchCity = async () => {
	const city = document.getElementById("city-input").value;
	await getWeatherData(city);
};

const showWeatherData = (weatherData) => {
	document.getElementById("temp").innerHTML = weatherData.main.temp;
	document.getElementById("city-name").innerHTML = weatherData.name;
	document.getElementById("weather-type").innerHTML = weatherData.weather[0].main;
	document.getElementById("min-temp").innerHTML = weatherData.main.temp_min;
	document.getElementById("max-temp").innerHTML = weatherData.main.temp_max;
};

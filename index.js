window.addEventListener('load', (event) => {
	console.log('page is fully loaded');
	registerSW();
});

const searchForm = document.querySelector('.search-location');

const cityValue = document.querySelector('.search-location input');

const cityName = document.querySelector('.city-name p');

const cardBody = document.querySelector('.card-body');

const timeImage = document.querySelector('.card-top img');

const cardInfo = document.querySelector('.back-card');

const giveCelcius = (kelvin) => {
	celcius = Math.round(kelvin - 273.15);
	return celcius;
};

const isDayTime = (icon) => {
	if (icon.includes('d')) {
		return true;
	} else {
		return false;
	}
};

updateWeather = (city) => {
	console.log(city);

	const imageName = city.weather[0].icon;

	const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;

	cityName.textContent = city.name;

	cardBody.innerHTML = `
						<div class="card-mid row">
						<div class="col-8 text-center temp">
							<span>${giveCelcius(city.main.temp)}&deg;C</span>
						</div>
						<div class="col-4 condition-temp">
							<p class="condition">${city.weather[0].description}</p>
							<p class="high">${giveCelcius(city.main.temp_max)}</p>
							<p class="low">${giveCelcius(city.main.temp_min)}</p>
						</div>
					</div>

					<div class="icon-container card shadow mx-auto">
						<img src="${iconSrc}" alt="" />
					</div>
					<div class="card-bottom px-5 py-5 row">
						<div class="col text-center">
							<p>${giveCelcius(city.main.feels_like)}&deg;C</p>
							<span>Feels like</span>
						</div>
						<div class="col text-center">
							<p>${giveCelcius(city.main.temp_max)}%</p>
							<span>Humidity</span>
						</div>
					</div>
				</div>
	`;

	if (isDayTime(imageName)) {
		console.log('day');
		timeImage.setAttribute('src', 'images/day_image.svg');
		if (cityName.classList.contains('text-white')) {
			cityName.classList.remove('text-white');
		} else {
			cityName.classList.add('text-black');
		}
	} else {
		console.log('night');
		timeImage.setAttribute('src', 'images/night_image.svg');

		if (cityName.classList.contains('text-black')) {
			cityName.classList.remove('text-black');
		} else {
			cityName.classList.add('text-white');
		}
	}
	cardInfo.classList.remove('d-none');
};

// add event listerner to form
searchForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const citySearched = cityValue.value.trim();
	// console.log(citySearched);
	searchForm.reset();

	requestCity(citySearched)
		.then((data) => {
			updateWeather(data);
		})
		.catch((error) => {
			console.log(error);
		});
});

async function registerSW() {
	if ('serviceWorker' in navigator) {
		try {
			await navigator.serviceWorker.register('./sw.js');
		} catch (e) {
			console.log('SW registration failed');
		}
	}
}

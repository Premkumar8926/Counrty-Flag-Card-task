document.addEventListener("DOMContentLoaded", () => {
  const countriesContainer = document.getElementById('countries-container');

  // Fetch countries data
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
      countries.forEach(country => {
        const countryCard = createCountryCard(country);
        countriesContainer.appendChild(countryCard);
      });
    })
    .catch(error => console.error('Error fetching countries:', error));
});

function createCountryCard(country) {
  const col = document.createElement('div');
  col.className = 'col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-4'; // Adjusted for grid system

  const card = document.createElement('div');
  card.className = 'card';

  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';
  cardHeader.textContent = country.name.common;

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const flagImg = document.createElement('img');
  flagImg.src = country.flags.png;
  flagImg.alt = `${country.name.common} Flag`;
  flagImg.className = 'card-img-top mb-3';

  const capital = document.createElement('p');
  capital.innerHTML = `<strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}`;

  const latlng = document.createElement('p');
  latlng.innerHTML = `<strong>Lat/Lng:</strong> ${country.latlng.join(', ')}`;

  const region = document.createElement('p');
  region.innerHTML = `<strong>Region:</strong> ${country.region}`;

  const countryCodes = document.createElement('p');
  countryCodes.innerHTML = `<strong>Country Codes:</strong> ${country.cca2}, ${country.cca3}, ${country.ccn3}`;

  const weatherButton = document.createElement('button');
  weatherButton.className = 'btn btn-primary';
  weatherButton.textContent = 'Click for Weather';
  weatherButton.onclick = () => fetchWeather(country.latlng, cardBody);

  // Append all elements to cardBody
  cardBody.append(flagImg, capital, latlng, region, countryCodes, weatherButton);

  // Append cardHeader and cardBody to card
  card.append(cardHeader, cardBody);

  // Append card to col
  col.appendChild(card);

  // Return the created col element
  return col;
}

function fetchWeather(latlng, cardBody) {
  const [lat, lon] = latlng;
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(weather => {
      const weatherInfo = document.createElement('div');
      weatherInfo.innerHTML = `
        <p><strong>Weather:</strong> ${weather.weather[0].description}</p>
        <p><strong>Temperature:</strong> ${weather.main.temp}°C</p>
        <p><strong>Humidity:</strong> ${weather.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${weather.wind.speed} m/s</p>
      `;
      cardBody.appendChild(weatherInfo);
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
      const errorInfo = document.createElement('p');
      errorInfo.innerHTML = `<strong>Error fetching weather data. Please try again later.</strong>`;
      cardBody.appendChild(errorInfo);
    });
}

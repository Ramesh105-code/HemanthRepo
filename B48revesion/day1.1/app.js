const OPENWEATHER_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
let currentCity = '';

let map, marker;

function initMap(lat = 0, lon = 0) {
  if (!map) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat, lng: lon },
      zoom: 8
    });
    marker = new google.maps.Marker({ position: { lat, lng: lon }, map });
  } else {
    map.setCenter({ lat, lng: lon });
    marker.setPosition({ lat, lng: lon });
  }
}

document.getElementById('searchBtn').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return alert('Enter city name');
  currentCity = city;
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_KEY}&units=metric`);
  const data = await res.json();
  if (res.ok) {
    const { name, main, weather, coord } = data;
    document.getElementById('weatherResult').innerHTML =
      `<h2>${name}</h2>
       <p>Temp: ${main.temp}°C</p>
       <p>Humidity: ${main.humidity}%</p>
       <p>Condition: ${weather[0].description}</p>`;
    initMap(coord.lat, coord.lon);
  } else {
    document.getElementById('weatherResult').textContent = 'City not found';
  }
});

document.getElementById('forecastBtn').addEventListener('click', async () => {
  if (!localStorage.getItem('token')) {
    return window.location = 'login.html';
  }
  if (!currentCity) {
    return alert('Search for a city first');
  }
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${OPENWEATHER_KEY}&units=metric`);
  const data = await res.json();
  if (res.ok) {
    document.getElementById('forecastResult').innerHTML = '';
   
    for (let i = 0; i < data.list.length; i += 8) {
      const item = data.list[i];
      const date = new Date(item.dt_txt).toLocaleDateString();
      const html = `
        <div class="forecast-item">
          <p>${date}</p>
          <p>${item.main.temp}°C</p>
          <p>${item.weather[0].main}</p>
        </div>`;
      document.getElementById('forecastResult').insertAdjacentHTML('beforeend', html);
    }
  }
});
document.getElementById('location-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('location-input').value;
    if(location) 
    {
        getWeather(location);
    } 
    else {
        alert('Please enter a location');
    }
});

function getWeather(location) {
    const apiKey = '66553c60211086d5830b6cbd3a6f3501';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    displayLoading();
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data); //Debug: Log the API response
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('Location not found');
                hideLoading();
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            hideLoading();
        });
}

function displayLoading() {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = '<p>Loading...</p>';
    weatherInfo.classList.remove('hidden');
}

function hideLoading() {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.classList.add('hidden');
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    
    //Ensure weather-info element exists
    if(!weatherInfo) 
    {
        console.error('Element with ID "weather-info" not found');
        return;
    }

    //Clear existing content
    weatherInfo.innerHTML = '';

    //Populate the weather information
    weatherInfo.innerHTML = `
        <h2 id="weather-location">${data.name}, ${data.sys.country}</h2>
        <p id="weather-description">Weather: ${data.weather[0].description}</p>
        <p id="weather-temperature">Temperature: ${data.main.temp}°C</p>
        <p id="weather-humidity">Humidity: ${data.main.humidity}%</p>
        <p id="weather-wind">Wind Speed: ${data.wind.speed} m/s</p>
    `;
    
    weatherInfo.classList.remove('hidden');
}

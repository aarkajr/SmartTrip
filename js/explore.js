const searchForm = document.getElementById("searchForm");

const destinationInput = document.getElementById("destinationInput");

const destinationResult = document.getElementById("destinationResult");


searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const destination =
        destinationInput.value.trim();

    if (destination === "") {

        destinationResult.innerHTML = `
            <div class="empty-explore">
                <div class="empty-icon">⚠️</div>

                <h2>
                    Enter a destination
                </h2>

                <p>
                    Please type a city or destination to explore.
                </p>
            </div>
        `;

        return;
    }

    destinationResult.innerHTML = `
        <div class="empty-explore">

            <div class="empty-icon">
                🔎
            </div>

            <h2>
                Searching for ${destination}...
            </h2>

            <p>
                Getting travel information for your destination.
            </p>

        </div>
    `;
    searchDestination(destination);

});

async function searchDestination(destination) {

    try {

        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destination)}&count=1&language=en&format=json`
        );


        if (!response.ok) {

            throw new Error("Unable to search destination.");

        }


        const data = await response.json();


        if (!data.results || data.results.length === 0) {

            throw new Error("Destination not found.");

        }


        const place = data.results[0];


        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
        );


        if (!weatherResponse.ok) {

            throw new Error("Unable to get weather information.");

        }


        const weatherData = await weatherResponse.json();

        const currentWeather = weatherData.current;

        let weatherDescription = "Unknown";

        if (currentWeather.weather_code === 0) {
            weatherDescription = "Clear sky";
        } else if (
            currentWeather.weather_code >= 1 &&
            currentWeather.weather_code <= 3
        ) {
            weatherDescription = "Partly cloudy";
        } else if (
            currentWeather.weather_code >= 45 &&
            currentWeather.weather_code <= 48
        ) {
            weatherDescription = "Foggy";
        } else if (
            currentWeather.weather_code >= 51 &&
            currentWeather.weather_code <= 67
        ) {
            weatherDescription = "Rain";
        } else if (
            currentWeather.weather_code >= 71 &&
            currentWeather.weather_code <= 77
        ) {
            weatherDescription = "Snow";
        } else if (
            currentWeather.weather_code >= 80 &&
            currentWeather.weather_code <= 82
        ) {
            weatherDescription = "Rain showers";
        } else if (
            currentWeather.weather_code >= 95
        ) {
            weatherDescription = "Thunderstorm";
        }


        destinationResult.innerHTML = `

    <div class="weather-result">

        <img
            class="weather-image"
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85"
            alt="Travel destination"
        >

        <div class="weather-location">

    <div class="weather-result">

        <div class="weather-location">

            <span>
                DESTINATION FOUND
            </span>

            <h2>
                ${place.name}
            </h2>

            <p>
                ${place.country}
            </p>

        </div>


        <div class="weather-main">

            <div>
            <span class="weather-label">
                CURRENT WEATHER
            </span>

            <p class="weather-description">
                ${weatherDescription}
            </p>

            <strong>
                ${currentWeather.temperature_2m}°C
            </strong>

            </div>


            <div class="weather-details">

                <div>
                    <span>💧</span>

                    <p>
                        Humidity
                    </p>

                    <strong>
                        ${currentWeather.relative_humidity_2m}%
                    </strong>
                </div>


                <div>
                    <span>💨</span>

                    <p>
                        Wind
                    </p>

                    <strong>
                        ${currentWeather.wind_speed_10m} km/h
                    </strong>
                </div>

            </div>

        </div>

    </div>

`;
    }
    catch (error) {

        destinationResult.innerHTML = `

            <div class="empty-explore">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h2>
                    Destination not found
                </h2>

                <p>
                    We couldn't find that destination.
                    Try another city.
                </p>

            </div>

        `;

        console.error(error);

    }

}
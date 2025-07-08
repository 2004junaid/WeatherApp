const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const errorElement = document.getElementById("error");
    const resultContainer = document.getElementById("weatherResult");

    if (!city) {
        errorElement.textContent = "Please enter a city name.";
        resultContainer.classList.add("hidden");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("temperature").textContent = data.main.temp;
        document.getElementById("humidity").textContent = data.main.humidity;
        document.getElementById("windSpeed").textContent = (data.wind.speed * 3.6).toFixed(2); // m/s to km/h

        errorElement.textContent = "";
        resultContainer.classList.remove("hidden");
    } catch (error) {
        resultContainer.classList.add("hidden");
        errorElement.textContent = "Could not find weather for that city.";
    }
}

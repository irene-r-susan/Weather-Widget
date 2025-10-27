const apikey = "78aa6c4f1c815b7a5faa994e0627ed37";

const searchBtn = document.getElementById("searchBtn");

const unitToggle =document.getElementById("unitToggle");
const unitLabel =document.getElementById("unitLabel");
const tempElement = document.getElementById("temp");

let currentTempCelsius = null;
let isFahrenheit = false;

unitToggle.addEventListener("change", () => {
    
  isFahrenheit = unitToggle.checked;
  updateTemperatureDisplay();
});

searchBtn.addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status !== 200) throw new Error("City not found");

 document.getElementById("cityName").textContent = city;

    document.getElementById("toggleContainer").style.display = "inline-block";
 document.getElementById("desc").textContent = `Condition: ${data.weather[0].description}`;

    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;

    currentTempCelsius = data.main.temp;
    isFahrenheit = false;


    unitToggle.checked = false;
    unitLabel.textContent = "°C";

    updateTemperatureDisplay();
    setWeatherBackground(data.weather[0].description);
  } catch (error) {
    alert("City not found or invalid input!");
    console.error("Error:", error);
  }

  document.getElementById("cityInput").value = "";
});



function updateTemperatureDisplay() {

  if (currentTempCelsius === null) return;

  if (isFahrenheit) {
    const tempF = (currentTempCelsius * 9 / 5) + 32;
    tempElement.textContent = `Temperature: ${tempF.toFixed(1)}°F`;
    unitLabel.textContent = "°F";
  } else {

    tempElement.textContent = `Temperature: ${currentTempCelsius.toFixed(1)}°C`;
    unitLabel.textContent = "°C";
  }
}

function setWeatherBackground(condition) {
  condition = condition.toLowerCase();

  if (condition.includes("sunny")) {

    document.body.style.background = "linear-gradient(to bottom, #f7dc6f, #f4d03f)";

  }else if (condition.includes("clear") || condition.includes("rain") || condition.includes("drizzle")) {
    document.body.style.background = "linear-gradient(to bottom, #5dade2, #2e86c1)";
  }else if 
  (condition.includes("cloud")) {
    document.body.style.background = "linear-gradient(to bottom, #bdc3c7, #95a5a6)";
  }else if 
  (condition.includes("haze") || condition.includes("mist") || condition.includes("fog")) {
    document.body.style.background = "linear-gradient(to bottom, #d7dbdd, #85929e)";
  }else if (condition.includes("snow")) {
    document.body.style.background = "linear-gradient(to bottom, #ffffff, #d6eaf8)";
  }else 
    {
    document.body.style.background = "linear-gradient(to bottom, #aed6f1, #5499c7)";
  }
}

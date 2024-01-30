const resultContainer = document.querySelector(".resultContainer");
let searchValue;
let townsCoor = [];
let results = [];

async function fetchData(Town) {
  await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${Town}&limit=1&appid=50a51d3d505fad2c3882152b87d4225d`
  )
    .then((res) => res.json())
    .then((res) => {
      townsCoor = res.map((townCoor) => {
        return {
          name: townCoor.name,
          latitude: townCoor.lat,
          longitude: townCoor.lon,
        };
      });
    });

  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${townsCoor[0].latitude}&lon=${townsCoor[0].longitude}&appid=50a51d3d505fad2c3882152b87d4225d`
  );
  const weatherData = await weatherResponse.json();
  if (typeof weatherData === "object") {
    results = [
      {
        name: weatherData.name,
        weather: weatherData.weather[0].description,
        temp: Math.round(parseInt(weatherData.main.temp) - 273.15) + "°C",
      },
    ];
  } else {
    console.error("Invalid response format for weather data");
    return;
  }
  console.log(results);
}

const resultsDispaly = () => {
  resultContainer.innerHTML = `
  <h1>${townsCoor[0].name}</h1>
  <p>${results[0].weather}</p>
  <span>${results[0].temp}</span>
  `;
};

search.addEventListener("input", (e) => {
  searchValue = e.target.value;
});

searchBtn.addEventListener("click", async () => {
  await fetchData(searchValue);
  resultsDispaly();
});

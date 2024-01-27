async function fetchData() {
  await fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=Paris&limit=5&appid=50a51d3d505fad2c3882152b87d4225d"
  );
}

const btn = document.getElementById("searchBtn");
const winfo = document.getElementById("winfo");
const html = `<div class="div1">
<div id="temp"></div>
<h2 id="city"></h2>
</div>
<img src="" id="wicon">
<div class="div2">
<div class="left">
    <img src="images/humidity.png" id="hlogo">
    <div id="humid"></div>
    <small>Humidity</small>
</div>
<div class="right">
    <img src="images/wind.png" id="wlogo">
    <div id="wind"></div>
    <small>Wind Speed</small>
</div>
</div>`;
function addcard() {
  winfo.classList.add("active");
  winfo.innerHTML = html;
}
const api = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const apikey = "310ef6e23c303ee770d42e6fa0e1636b";
const search = document.getElementById("location");

async function displayinfo() {
  const city = search.value;
  const a = await fetch(api + city + `&appid=${apikey}`);
  if (a.status == 404 || a.status == 400) {
    alert("Invalid City name");
  } else {
    var data = await a.json();
    addcard();
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.getElementById("humid").innerHTML = data.main.humidity + "%";
    document.getElementById("wind").innerHTML = Math.round(data.wind.speed) + "km/h";
    console.log(data);
    let wicon =document.getElementById('wicon')
    if(data.weather[0].main=="Clouds"){
      wicon.src = "images/clouds.png";
    }
    else if(data.weather[0].main=="Mist"){
      wicon.src = "images/mist.png";
    }
    else if(data.weather[0].main=="Clear"){
      wicon.src = "images/clear.png";
    }
    else if(data.weather[0].main=="Drizzle"){
      wicon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main=="Rain"){
      wicon.src = "images/rain.png";
    }
  }
}
btn.addEventListener("click", () => {
  displayinfo();
});

const apikey = "6f4ae16f6a196b18051eb8fce43018d9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")



async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    var data = await response.json();

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "../RESOURCES/img/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "../RESOURCES/img/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "../RESOURCES/img/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "../RESOURCES/img/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "../RESOURCES/img/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})





function success(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    console.log(lat);
    console.log(lon);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ko&units=metric&appid=a60165ce2f175fe6914e08643827b2ef`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        /*if(!response.ok) {
                throw new Error("Fetch Error")
        })*/
        .then(data => {
            let temperature = data.main.temp;
            const cityName = data.name;
            const weatherData = data.weather[0].main;
            const tempText = document.querySelector(".main-temperature__text");
            tempText.innerText = `${temperature.toFixed(1)}°C`;
            const regionText = document.querySelector(".header__region");
            regionText.innerText = cityName;
            const weatherImg = document.getElementById("main-temperature__img");
            console.log(`${cityName}: ${temperature}`);
            console.log(weatherData);
            switch(weatherData) {
                case 'Clear':
                    weatherImg.src = `imgs/sunny.png`;
                    break;
                case 'Clouds':
                    weatherImg.src = `imgs/cloudy.png`;
                    break;
                case 'Rain':
                    weatherImg.src = `imgs/rainy.png`;
                    break;
                case 'Snow':
                    weatherImg.src = `imgs/.png`;
                    break;
                case 'Thunderstorm':
                    weatherImg.src = `imgs/thunder.png`;
                    break;
            }
        })
        .catch((error) => {
            return error;
        });
}

function err() {
    console.log("Coords Error!")
}

async function fetchFunc() {
    const city = searchInput.value;
    const urlDup = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ko&units=metric&appid=a60165ce2f175fe6914e08643827b2ef`;
    try {
        const res = await fetch(urlDup);
        const data = await res.json();
        console.log(data);
        let temperatureDup = data.main.temp;
        const weatherDataDup = data.weather[0].main;
        const weatherImgDup = document.getElementById("main-temperature__img");
        const tempTextDup = document.querySelector(".main-temperature__text");
        tempTextDup.innerText = `${temperatureDup.toFixed(1)}°C`;
        const regionTextDup = document.querySelector(".header__region");
        regionTextDup.innerText = city;
        switch(weatherDataDup) {
            case 'Clear':
                weatherImgDup.src = `imgs/sunny.png`;
                break;
            case 'Clouds':
                weatherImgDup.src = `imgs/cloudy.png`;
                break;
            case 'Rain':
                weatherImgDup.src = `imgs/rainy.png`;
                break;
            case 'Snow':
                weatherImgDup.src = `imgs/.png`;
                break;
            case 'Thunderstorm':
                weatherImgDup.src = `imgs/thunder.png`;
                break;
        }
        console.log(`${city} :${temperatureDup}`);
        searchInput.value="";
    } catch(error) {
        console.error(error);
    }
}

const searchInput = document.querySelector(".header__find-input");
const searchInputIcon = document.querySelector(".header__find i");

searchInputIcon.addEventListener("click", function() {
    searchInput.classList.toggle("display-hidden");
    searchInput.focus;
})

searchInput.addEventListener("blur", function() {
    searchInput.classList.add("display-hidden");
})

window.navigator.geolocation.getCurrentPosition(success, err);
searchInputIcon.addEventListener("click", fetchFunc);
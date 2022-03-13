const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt) {
    if (evt.keyCode == 13) {
        // 13 represents enter key
        getResults(searchbox.value);
    }

}

function getResults(city) {
    fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(response => {
            console.log(response);
            displayResults(response);
        });
}

function displayResults(response) {
    var city = document.querySelector('.location .city');
    city.innerText = `${response.name}, ${response.sys.country}`;


    let now = new Date();
    let myDate = document.querySelector('.location .date')
    myDate.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(response.main.temp)} <span>&deg;C</span>`;

    let weather = document.querySelector('.current .weather');
    weather.innerText = response.weather[0].main;

    let hilo = document.querySelector('.hi-low')
    hilo.innerHTML = `${Math.round(response.main.temp_min)} &deg;C : ${Math.round(response.main.temp_max)} &deg;C`;

}



function dateBuilder(dt) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let days = ['Mon', 'Tus', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    let date, day, month, year;

    day = days[dt.getDay()];
    month = months[dt.getMonth()];
    year = dt.getFullYear();
    date = dt.getDate();

    return `${day} ${date} ${month} ${year}`
}
const get_loc = new getLocation;
const api = new API;
const searchCity = new GetCity;
const ui = new UI;

// Converting degrees into wind name
const degToCard = (deg) => {
    if (deg > 11.25 && deg < 33.75) {
        return "N/NE";
    } else if (deg > 33.75 && deg <= 56.25) {
        return "E/NE";
    } else if (deg > 56.25 && deg <= 78.75) {
        return "E";
    } else if (deg > 78.75 && deg <= 101.25) {
        return "E/SE";
    } else if (deg > 101.25 && deg <= 123.75) {
        return "E/SE";
    } else if (deg > 123.75 && deg <= 146.25) {
        return "SE";
    } else if (deg > 146.25 && deg <= 168.75) {
        return "S/SE";
    } else if (deg > 168.75 && deg <= 191.25) {
        return "S";
    } else if (deg > 191.25 && deg <= 213.75) {
        return "S/SW";
    } else if (deg > 213.75 && deg <= 236.25) {
        return "SW";
    } else if (deg > 236.25 && deg <= 258.75) {
        return "W/SW";
    } else if (deg > 258.75 && deg <= 281.25) {
        return "W";
    } else if (deg > 281.25 && deg <= 303.75) {
        return "W/NW";
    } else if (deg > 303.75 && deg <= 326.25) {
        return "NW";
    } else if (deg > 326.25 && deg <= 348.75) {
        return "N/NW";
    } else {
        return "N";
    }
}


get_loc.getCurrentLocation((lat, lon) => {
    api.getPostion(lat, lon)
        .then(result => {
            ui.createMainInfo({
                city: result.name,
                country: result.sys.country,
                temp: (result.main.temp - 273).toFixed(),
                weather: result.weather[0].description,
                icon: result.weather[0].icon,
            });
            ui.createAddInfo({
                humidity: result.main.humidity,
                feels: (result.main.feels_like - 273).toFixed(),
                wind_deg: degToCard(result.wind.deg),
                wind_speed: result.wind.speed
            });

        })
        .catch(err => err);
})



document.querySelector('.card-body').addEventListener('click', (e) => {
    if(e.target.classList.contains('btn')) {
        showModal(); 
    }      
})

function showModal(){
    console.log(2);
    const wrap = document.querySelector('#wrapper');
    wrap.className = wrap.className !== 'show' ? 'show' : 'hide';
    


    
    
}

document.querySelector('.form-control-sm').addEventListener('keyup', (e) => {
    const cityName = e.target.value;
    
        searchCity.getAllCities()
            .then(data => {
                const cityArray = data.map(item => item.name);
                console.log(cityArray);
            })


})
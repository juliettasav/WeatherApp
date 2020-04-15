const get_loc = new getLocation;
const api = new API;
const ui = new UI;


get_loc.getCurrentLocation((lat, lon) => {
    api.getPostion(lat, lon)
        .then(result => {
            ui.createMainInfo({
                city: result.name,
                country: result.sys.country,
                temp: result.main.temp,
                weather: result.weather[0].description,
                icon: result.weather[0].icon,
            });
            ui.createAddInfo({
                humidity: result.main.humidity,
                feels: result.main.feels_like,
                wind_deg: result.wind.deg,
                wind_speed: result.wind.speed
            });
            //console.log(result);
            
        })
        .catch(err => err);
})
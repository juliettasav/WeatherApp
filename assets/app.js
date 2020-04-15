const get_loc = new getLocation;
const api = new API;


get_loc.getCurrentLocation((lat, lon) => {
    api.getPostion(lat, lon)
        .then(result => console.log(result));
})
class BYLOCATION {
    constructor(){
        this.api_key = '7ea9ef21b0e5ffdb85b88fc865589f80'
    }

    getPostion(lat, lon){
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.api_key}`;
        return fetch(url)
                .then(res => res.json())
    }

    getPositionByCity(city){
        console.log(city);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.api_key}
        `;
        return fetch(url)
                .then(res => res.json());
    }


}
class GETCITIES {
    constructor() {
        this.api_key = ''
    }

    async getAllCities(){
        const response = await fetch('./assets/json/cities.json');
        const data = await response.json();
        return data;
    }
}


class GETCITIES {
    constructor() {
        this.api_key = ''
    }

    async getAllCities(){
        const response = await fetch('./assets/cities.json');
        const data = await response.json();
        return data;
    }
}


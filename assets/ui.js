class UI{
    constructor(){
        this.divCard = document.querySelector('.card-body');
    }

    createMainInfo(data){
        // console.log(data);
        this.divCard.innerHTML =  `
            <div class="container container-card">
                <h1 class="card-title">${data.city}, ${data.country}</h1>
                <div class="row">
                    <div class="col-md-6">
                        <h4 class="card-subtitle text-muted">${data.weather}</h4>
                        <h4 class="card-subtitle mt-3">${data.temp}&deg;C</h4>
                    </div>
                    <div class="col-md-6">
                        <img class="card-img" src="https://openweathermap.org/img/wn/${data.icon}@2x.png">
                    </div>
                </div>

                <ul class="list-group mb-5 text-white"></ul>

                <button type="button" class="btn btn-outline-primary">Change Location</button>


            </div>
            

        `;
        
    }

    createAddInfo(data){
        // console.log(data);
        const ul = document.querySelector('.list-group');
        ul.innerHTML = `
            <li class="">Fells Like: ${data.feels}&deg;C</li>
            <li class="">Humidity: ${data.humidity}%</li>
            <li class="">Wind from the ${data.wind_deg} at ${data.wind_speed} MPH</li>
        `
        
    }

    showAlert(massage) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-dismissible alert-danger';
        alert.appendChild(document.createTextNode(massage));
        const parent = document.querySelector('.modal-body');
        const beforeChild = document.querySelector('.form-group.autocomplete');
        parent.insertBefore(alert, beforeChild);
        setTimeout(() => {
            alert.remove();
        }, 2000)
    }
}


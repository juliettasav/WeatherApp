const get_loc = new getLocation;
const api = new BYLOCATION;
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
        showHideModal(); 
    }      
})


document.querySelector('#wrapper').addEventListener('click', (e) => {

    if(e.target.classList.contains('btn-close') || e.target.classList.contains('modal')) {
        showHideModal();      
    }
})

function showHideModal(){
    const wrap = document.querySelector('#wrapper');
    wrap.className = wrap.className !== 'show' ? 'show' : 'hide';
}


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
        
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }

  
      
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });

  }

if(document.querySelector('#wrapper').classList.contains('show')) {
    searchCity.getAllCities()
            .then(data => {
                const cityArray = data.map(item => item.name);
                return cityArray;
            })
            .then(data => {
                autocomplete(document.querySelector('input'), data);
            })
    document.querySelector('.btn-save').addEventListener('click', () => {
        const choosenCity = document.querySelector('input').value;
        api.getPositionByCity(choosenCity)
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
            showHideModal();
        
    })
}

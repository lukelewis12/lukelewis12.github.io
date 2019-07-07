// Weather Site Java Script Functions

console.log('My Java Script is being read.');

let date = new Date();
let nextHour = date.getHours() + 1;

// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - lew16022@byui.edu"
    }
  };

// Set up a local storage variable
var storage = window.localStorage;


// Call the format time function.

formatTime(nextHour);

// Calculate the Wind Chill

function buildWC(speed, temp){
    let feelTemp = document.getElementById('feelslike');

    // Compute the Wind Chill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    //Round the answer down to an integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp.
    wc = (wc>temp)?temp:wc;

    //Display the wind chill
    console.log(wc);
    // wc = Feels like '+wc+' 'F';
    feelTemp.innerHTML = wc;
}

// Wind dial function

function windDial(direction){
    // Get the wind dial container.
    let dial = document.getElementById("dial");
    console.log(direction);

    // Determine the dial class.
    switch (direction){
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule selector.
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "s");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "e");
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "w");
            break;
    }
}

function getCondition(condition){
    console.log(condition);
    // Determine the condition category.
    if (condition.includes("cloud")==true) {return "clouds";
    }
    if (condition.includes("rain")==true) {return "rain";
    }
    if (condition.includes("thunderstorms")==true) {return "rain";
    }
    if (condition.includes("wet")==true) {return "rain";
    }
    if (condition.includes("clear")==true) {return "clear";
    }
    if (condition.includes("sun")==true) {return "clear";
    }
    if (condition.includes("fog")==true) {return "fog";
    }
    if (condition.includes("snow")==true) {return "snow";
    }
    }

function changeSummaryImage(conditionreturn){
     condition = document.getElementById("curWeather");

    switch(conditionreturn){
        case "rain":
            condition.setAttribute("class", "rain");
        break;
        case "clouds":
            condition.setAttribute("class", "clouds");
            break;
        case "fog":
            condition.setAttribute("class", "fog");
            break;
        case "snow":
            condition.setAttribute("class", "snow");
            break;
        case "clear":
            condition.setAttribute("class", "clear");
            break;
    }
}


// Create a function to convert elevation from meters to feet. 
function convertMeters(meters){
    let feet = document.getElementById('elevation')
    let m = meters;
    let f = Math.round(m * 3.28);
    console.log(f);
    feet.innerHTML = f;
}



// Convert, format time to 12 hour format. 
function formatTime(hour){
    if(hour > 23){
        hour-=24;
    }  
    let amPM = (hour > 11) ? "pm" : "am";
    if (hour > 12){
        hour -=12;
    }
    if(hour == 0) {
        hour = "12";
    }
    return hour + amPM;
}

//Build the hourly temperature list
function buildHourlyData(nextHour, hourlyTemps) {
    // Data comes from a JavaScript object of hourly name - value pairs
    // Next hour should have a variable between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour
    // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[0] + 'deg;F</li>';
    // Build the remaining list items using a for loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
        hourlyListItems += '<li'> + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
    }
    console.log('HourlyList is: ' +hourlyListItems);
    return hourlyListItems;
}


  // Gets location information from the NWS API
  function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 

   
      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations; 
      // Call the function to get the list of weather stations
      getStationId(stationsURL); 
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function


   // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 

      
    // Call the convert meters function.
    var elevation = convertMeters(stationElevation);
    

   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function

   // Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage 
   storage.setItem('temp', data.properties.temperature.value);
   storage.setItem('high', data.properties.maxTemperatureLast24Hours.value);
   storage.setItem('low', data.properties.minTemperatureLast24Hours.value);
   storage.setItem('precip', data.properties.precipitationLast6Hours.value);
   storage.setItem('wind', data.properties.windSpeed.value);
   storage.setItem('direction', data.properties.windDirection.value);
   storage.setItem('gusts', data.properties.windGust.value);

      // Build the page for viewing.
      // Create variables and retrieve info from local storage. 
    let temp = storage.getItem('temp');
    let high = storage.getItem('high');
    let low = storage.getItem('low');
    let wind = storage.getItem('wind');
    let direction = storage.getItem('direction');
    let gusts = storage.getItem('gusts');
           // Populate the current location weather page
 function buildPage(){
    // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
    buildWC(wind,temp);
    
    // Task 2 - Populate location information

    document.getElementById.innerHTML = elevation;

    // Task 3 - Populate weather information

    document.getElementById('currenttemp').innerHTML = temp;
    document.getElementById('hightemp').innerHTML = high;
    document.getElementById('lowtemp').innerHTML = low;
    document.getElementById('wind-speed').innerHTML = wind;
    document.getElementById('gusts').innerHTML = gusts;

    // Task 4 - Hide status and show main
    document.getElementsByTagName("section")[0].setAttribute("class", "show");
   }
      
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function

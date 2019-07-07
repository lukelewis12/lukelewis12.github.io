// These functions will work together to get weather information for the current location and populate the web page
// with the data. 
'use strict';

// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - lew16022@byui.edu"
    }
  };

// Set up a local storage variable
var storage = window.localStorage;

// Call the getGeoLocation function
getGeoLocation()

// Gets Longitude and Latiude of the current location.
function getGeoLocation(){
const status =document.getElementById('status');
status.innerHTML = 'Getting Location...';
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
     const lat = position.coords.latitude;
     const long = position.coords.longitude;
  
     // Combine the values
     const locale = lat + "," + long;
     console.log(`Lat and Long are: ${locale}.`);
  
     
   // Call getLocation function, send locale
   getLocation(locale);
  
    })
   } else {
    status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
   } // end else
  } //end getGeoLocation


//   // Gets location information from the NWS API
// function getLocation(locale) {
//     const URL = "https://api.weather.gov/points/" + locale; 
//     // NWS User-Agent header (built above) will be the second parameter 
//     fetch(URL, idHeader) 
//     .then(function(response){
//       if(response.ok){ 
//        return response.json(); 
//       } 
//       throw new ERROR('Response not OK.');
//     })
//     .then(function (data) { 
//       // Let's see what we got back
//       console.log('Json object from getLocation function:'); 
//       console.log(data);
//       // Store data to localstorage 
//       storage.setItem("locName", data.properties.relativeLocation.properties.city); 
//       storage.setItem("locState", data.properties.relativeLocation.properties.state); 
   
//       // Next, get the weather station ID before requesting current conditions 
//       // URL for station list is in the data object 
//       let stationsURL = data.properties.observationStations; 
//       // Call the function to get the list of weather stations
//       getStationId(stationsURL); 
//      }) 
//     .catch(error => console.log('There was a getLocation error: ', error)) 
//    } // end getLocation function


//    // Gets weather station list and the nearest weather station ID from the NWS API
// function getStationId(stationsURL) { 
//     // NWS User-Agent header (built above) will be the second parameter 
//     fetch(stationsURL, idHeader) 
//     .then(function(response){
//       if(response.ok){ 
//        return response.json(); 
//       } 
//       throw new ERROR('Response not OK.');
//     })
//     .then(function (data) { 
//       // Let's see what we got back
//       console.log('From getStationId function:'); 
//       console.log(data);
    
//       // Store station ID and elevation (in meters - will need to be converted to feet) 
//       let stationId = data.features[0].properties.stationIdentifier; 
//       let stationElevation = data.features[0].properties.elevation.value; 
//       console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
//       // Store data to localstorage 
//       storage.setItem("stationId", stationId); 
//       storage.setItem("stationElevation", stationElevation); 
   
//       // Request the Current Weather for this station 
//       getWeather(stationId);
//      }) 
//     .catch(error => console.log('There was a getStationId error: ', error)) 
//    } // end getStationId function

//    // Gets current weather information for a specific weather station from the NWS API
// function getWeather(stationId) { 
//     // This is the URL for current observation data 
//     const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
//     // NWS User-Agent header (built above) will be the second parameter 
//     fetch(URL, idHeader) 
//     .then(function(response){
//       if(response.ok){ 
//        return response.json(); 
//       } 
//       throw new ERROR('Response not OK.');
//     })
//     .then(function (data) { 
//       // Let's see what we got back
//       console.log('From getWeather function:'); 
//       console.log(data);
    
//       // Store weather information to localStorage 
//    storage.setItem('temp', data.properties.temperature.value);
//    storage.setItem('high', data.properties.maxTemperatureLast24Hours.value);
//    storage.setItem('low', data.properties.minTemperatureLast24Hours.value);
//    storage.setItem('precip', data.properties.precipitationLast6Hours.value);
//    storage.setItem('wind', data.properties.windSpeed.value);
//    storage.setItem('direction', data.properties.windDirection.value);
//    storage.setItem('gusts', data.properties.windGust.value);

//       // Build the page for viewing.
//       // Create variables and retrieve info from local storage. 
//     let temp = storage.getItem('temp');
//     let high = storage.getItem('high');
//     let low = storage.getItem('low');
//     let wind = storage.getItem('wind');
//     let direction = storage.getItem('direction');
//     let gusts = storage.getItem('gusts');

//       // Set variables to HTML elements.
//       document.getElementById('currenttemp').innerHTML = temp;
//       document.getElementById('hightemp').innerHTML = high;
//       document.getElementById('lowtemp').innerHTML = low;
//       document.getElementById('wind-speed').innerHTML = wind;
//       document.getElementById('gusts').innerHTML = gusts;


      
//      }) 
//     .catch(error => console.log('There was a getWeather error: ', error)) 
//    } // end getWeather function






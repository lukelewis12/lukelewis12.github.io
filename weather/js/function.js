// Weather Site Java Script Functions

console.log('My Java Script is being read.');

// Variables for function use
let temp = 31;
let speed = 5;
let direction = "SW";
let meters = 1514.246;
let condition = "thunderstorms"
let conditionreturn;
let date = new Date();
let nextHour = date.getHours() + 1;

// Call the format time function.

formatTime(nextHour);

// Call the get condition function.

conditionreturn = getCondition(condition);
console.log(conditionreturn);

// Call the change summary image function.

changeSummaryImage(conditionreturn);

// Call the wind dial function

windDial(direction);

//Call the wind chill function
buildWC(speed, temp);

// Call the convert meters function.
convertMeters(meters);

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
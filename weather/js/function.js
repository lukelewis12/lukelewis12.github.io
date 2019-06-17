// Weather Site Java Script Functions

console.log('My Java Script is being read.');

// Variables for function use
const temp = 31;
const speed = 5;
const direction = "South";
const meters = 1514.246;

// Call the wind dial function

windDial(direction);

//Call the wind chill function
buildWC(speed, temp);

// Call the convert meters function.
convertMeters(meters);

// Calculate the Wind Chill

function buildWC(speed, temp){
    const feelTemp = document.getElementById('feelslike');

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
    const dial = document.getElementById("dial");

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
    // Get the condition container.

    //Switch statement to determine the condition.


}

function changeSummaryImage(condition){

}
// Create a function to convert elevation from meters to feet. 
function convertMeters(meters){
    const feet = document.getElementById('elevation')
    let m = meters;
    let f = Math.round(m * 3.28);
    console.log(f);
    feet.innerHTML = f;
    
}
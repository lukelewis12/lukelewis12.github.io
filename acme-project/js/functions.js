// Check to see the JS is being read. 

console.log("My JavaScript is being read");

let pageNav = document.getElementById('nav');

pageNav.addEventListener('click', function(evt){

    // Get the city name.
    let pageName = evt.target.innerHTML;
    switch (pageName) {
      case "Anvils":
      case "Explosives":
      case "Decoys":
      case "Traps":
        evt.preventDefault();  
        break;
    }
  
  let acmeURL = "/acme-project/js/acme.json";
  
  // Call the fetch data function.
  // fetchData(acmeURL);
  
  // Creat the fetch function.
  
  // function fetchData(acmeURL){
    fetch(acmeURL)
    .then(function(response) {
    if(response.ok){
    return response.json();
    }
    throw new ERROR('Network response was not OK.');
    })
    .then(function(data){
      // Check the data object that was retrieved
      console.log(data);

      let i = data[pageName];
      
      // Set data from JSON file to local variables.

      let description = i.description;

      //Check 
      console.log(description);

      let name = i.name;

      //Check 
      console.log(name);

      let path = i.path;

      //Check
      console.log(path);

      let manufacturer = i.manufacturer;

      //Check
      console.log(manufacturer);

      let price = i.price;

      //Check 
      console.log(price);

      let reviews = i.reviews;

      //Check 
      console.log(reviews);

      //Set variables to HTML

      document.getElementById("content-header").innerHTML = name;
      document.getElementById("content-image").src = path;
      document.getElementById("content-description").innerHTML = description;
      document.getElementById("made-by-content").innerHTML = manufacturer;
      document.getElementById("reviews-content").innerHTML = reviews;
      document.getElementById("price-content").innerHTML = price;

      
      homePage.setAttribute('class', 'hide');
      contentPage.setAttribute('class', '');
    })
    .catch(function(error){
    console.log('There was a fetch problem: ', error.message);
    })
  // }
  })


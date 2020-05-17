/**
 * Display a list of star war movies provided via SWAPI and enable users to submit their favorite movies.
 * The users selection will be shown using an image of a heart colored in black and yellow.
 */

const request = new XMLHttpRequest();
const url = 'https://swapi.dev/api/films/';
request.open("GET", url);
request.send();

request.onreadystatechange = processRequest;

function processRequest(){
    // if the request state is done
    if(request.readyState == 4){
        movies = JSON.parse(request.responseText);
        createAndDisplayItemsList(movies);

    }
}

function createAndDisplayItemsList(jsonObj){    
    // get the movies array from SWAPI
    var moviesArr = jsonObj['results'];
    var movieTitle;
    var movieContainer = document.getElementById("movieContainer");

    for(var i=0; i < moviesArr.length; i++){
        movieTitle = moviesArr[i].title;
        
        // create elements dynamically for each movie 
        var movie = document.createElement('div');
        var checkbox = document.createElement('input');
        // the icon provides customized visualization for the checkbox element
        var icon = document.createElement('img');
        var title = document.createElement('h3');

        // set attributes to the elements
        movie.setAttribute("class", "movie");
        checkbox.setAttribute("id", "checkbox");
        checkbox.setAttribute("type", "checkbox");
        icon.setAttribute("class", "icon");
        icon.setAttribute("name", movieTitle);
        icon.setAttribute("src", "heart_outline.PNG");
        icon.setAttribute("onmouseover", "onMouseOver(this)");
        icon.setAttribute("onmouseleave", "onMouseLeave(this)");
        icon.setAttribute("onclick", "onClick(this)");
        title.setAttribute("id", "title");
       
        // set values
        title.innerHTML= movieTitle;
        movieContainer.appendChild(movie);
        movie.appendChild(checkbox);
        movie.appendChild(icon);
        movie.appendChild(title);
     
        // read previous favorite selecions from the local storage
        try {
            var result = localStorage.getItem(movieTitle);
            if(result != null){
                icon.src = "heart_filled.PNG"
            }            
        } catch(error) {
            console.log("error when reading the local storage");
        }   
    }   
}

function onMouseOver(element){
    // replace the icon to filled image
    element.src ="heart_filled.PNG"
}

function onMouseLeave(element){
    var exists;
    try {
        exists = localStorage.getItem(element.name);
        if(exists != null) {
            element.src = "heart_filled.PNG"
        } else {
            element.src = "heart_outline.PNG"
        }    
    } catch (error) {
        console.log("error when reading the local storage");
    }
    
}

function onClick(element){
    // verify if the element is in the storage - if so remove it, otherwise add it. display the icon accordingly
    var exists
    try {
        exists = localStorage.getItem(element.name);
        if(exists != null) {
            localStorage.removeItem(element.name);
            element.src = "heart_outline.PNG";
        } else {
            localStorage.setItem(element.name, element.name);
            element.src ="heart_filled.PNG";
        }
    } catch(error) {
        console.log("error when accessing the local storage");
    }
}

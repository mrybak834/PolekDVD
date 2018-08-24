import database from '../firebase/firebase';

// DB
const data = require("../../data.json");
const movies = data["movies"];
const keys = Object.keys(movies);
const limit = keys.length;

//TMDB
const api_key = "";
const genres = require("../../genres.json")["genres"];


let startTime, endTime;
let requestNumber = 0;

const loadDB = () => {
    startRequest();
};

function titleCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

let apiCalls = async () => {
    let key;
    let sequence = requestNumber * 5;

    for (key = sequence; key <= sequence + 4; key++){
        if(key >= limit){
            console.log("Hit limit: " + key);
            return;
        }
        const movie = movies[keys[key]];

        let query = movie.titlePL? movie.titlePL : movie.titleEN;
        query = query.replace(/720p.*/g, "");
        query = query.replace(/1080p.*/g, "");
        query = query.replace(/RC.*/g, "");
        query = query.replace(/HDTV.*/g, "");
        query = query.trim();

        // Search for the movie
        const fetchResult = await fetch("https://api.themoviedb.org/3/search/movie?api_key="+
                api_key +
                "&language=pl&query="+
                query +
                "&page=1&include_adult=true");
        const result = await fetchResult.json();

        let fullTitle = "" + movie.titlePL.trim() + "/" + movie.titleEN.trim();
        fullTitle = titleCase(fullTitle);

        let titlePL = movie.titlePL;
        titlePL = titlePL.replace(/720p.*/g, "");
        titlePL = titlePL.replace(/1080p.*/g, "");
        titlePL = titlePL.replace(/RC.*/g, "");
        titlePL = titlePL.replace(/HDTV.*/g, "");
        titlePL = titlePL.trim();
        titlePL = titleCase(titlePL);

        let titleEN = movie.titleEN;
        titleEN = titleEN.replace(/720p.*/g, "");
        titleEN = titleEN.replace(/1080p.*/g, "");
        titleEN = titleEN.replace(/RC.*/g, "");
        titleEN = titleEN.replace(/HDTV.*/g, "");
        titleEN = titleEN.trim();
        titleEN = titleCase(titleEN);

        let link = movie.link.trim();
        let year = movie.year;
        let genre = movie.genre.trim();
        genre = titleCase(genre);
        let rating = ( () => {
            switch(movie.rating.trim()) {
                case "REWELACYJNY": {
                    return 9;
                }
                case "BARDZO DOBRY": {
                    return 8;
                }
                case "DOBRY": {
                    return 7;
                }
                case "NIEZŁY": {
                    return 6;
                }
                case "ŚREDNI": {
                    return 5;
                }
                case "UJDZIE": {
                    return 4;
                }
                case "SŁABY": {
                    return 3;
                }
                default: {
                    return 5;
                }
            }
        } ) ();



        if (result.results.length === 0 || result.results === undefined){

            console.log("NOT FOUND: ");
            console.log(query);
            // console.log(titlePL);
            // console.log(titleEN);
            // console.log(link);
            // console.log(year);
            // console.log(genre);
            // console.log(rating);
            // console.log();
            // console.log();

            // Upload to DB
            database.ref('movies').update({
                [keys[key]]: {
                    "fullTitle": fullTitle,
                    "titlePL": titlePL,
                    "titleEN": titleEN,
                    "link": link,
                    "year": year,
                    "genre": genre,
                    "rating": rating,
                    "description": "",
                    "posterPath": "",
                    "backdropPath": ""
                }
            });
        }
        else {
            titlePL = titleCase(result.results[0].title);
            titleEN = titleCase(result.results[0].original_title);
            year = year? year : result.results[0].release_date;
            genre = genre? genre : (() => {
                let genreString = "";
                result.results[0].genre_ids.forEach((id) => {
                    genreString += genres[id].name;
                });

                return genreString;
            })();
            rating = result.results[0].vote_average? result.results[0].vote_average : rating;
            const description = result.results[0].overview;
            const posterPath = "http://image.tmdb.org/t/p/w500/" + result.results[0].poster_path;
            const backdropPath = "http://image.tmdb.org/t/p/w500/" + result.results[0].backdrop_path;


            // console.log("FOUND: ");
            // console.log(fullTitle);
            // console.log(titlePL);
            // console.log(titleEN);
            // console.log(link);
            // console.log(year);
            // console.log(genre);
            // console.log(rating);
            // console.log(description);
            // console.log(posterPath);
            // console.log(backdropPath);
            // console.log(result);

            // Upload to DB
            database.ref('movies').update({
                [keys[key]]: {
                    "fullTitle": fullTitle,
                    "titlePL": titlePL,
                    "titleEN": titleEN,
                    "link": link,
                    "year": year,
                    "genre": genre,
                    "rating": rating,
                    "description": description,
                    "posterPath": posterPath,
                    "backdropPath": backdropPath
                }
            });
        }
    }

    requestCallback();
}




function upload() {
    apiCalls();
};


function timeDiff() {
    return (endTime.getTime() - startTime.getTime());
}

function startRequest() {
    startTime = new Date();
    upload();
    requestNumber += 1;
}

function requestCallback() {
    console.log(requestNumber);
    endTime = new Date();
    var diff = timeDiff();
    if(diff < 5000) {
        //Too early to start API, need to wait.
        setTimeout(startRequest, 5000 - diff);
    } else {
        //It is fine to start request now.
        setTimeout(startRequest);
    }
}

export default loadDB;
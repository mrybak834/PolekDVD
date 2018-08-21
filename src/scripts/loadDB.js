import database from '../firebase/firebase';
const data = require("../../data.json");
const movies = data["movies"];
const keys = Object.keys(movies);
const limit = keys.length;
let startTime, endTime;
let requestNumber = 0;

const loadDB = () => {
    startRequest();
};

function request() {
    let key;
    let sequence = requestNumber * 100;
    for (key = sequence; key < sequence + 99; key++){
        if(key >= limit){
            return;
        }
        const movie = movies[keys[key]];
        database.ref('movies').update({
            [keys[key]]: {
                "titlePL": movie.titlePL.trim(),
                "titleEN": movie.titleEN.trim(),
                "link": movie.link.trim(),
                "year": movie.year,
                "genre": movie.genre.trim(),
                "rating": movie.rating.trim()
            }
        });
    }

    requestCallback();
};


function timeDiff() {
    return (endTime.getTime() - startTime.getTime());
}

function startRequest() {
    startTime = new Date();
    request();
    requestNumber += 1;
}

function requestCallback() {
    console.log(requestNumber);
    endTime = new Date();
    var diff = timeDiff();
    if(diff < 2000) {
        //Too early to start API, need to wait.
        setTimeout(startRequest, 2000 - diff);
    } else {
        //It is fine to start request now.
        setTimeout(startRequest);
    }
}

export default loadDB;
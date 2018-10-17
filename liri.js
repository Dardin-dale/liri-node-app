require("dotenv").config();
var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');
var moment = require('moment');

var args = process.argv;
var spotify = new Spotify(keys.spotify);

var command = args[2];
var input = args.slice(3);

//Parses possible commands
switch (command) {
    case 'concert-this':
        concertThis(input.join(' '));
        break;

    case 'spotify-this-song':
        if(input.length > 0) {
          spotifyThis(input.join(' '));  
        } else {
          spotifyThis('The Sign Ace of Base');
        }
        break;
        
    case 'movie-this':
        if (input.length > 0) {
          movieThis(input.join('+'));  
        } else {
          movieThis('mr+nobody');
        }
        break;

    case 'do-what-it-says':
        doWhat();
        break;
    default:
        break;
}

//Logs the Venue, location and event date for an artist
function concertThis (artist) {
  var query = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  //for each event : Name of Venue, Venue Location, Date of Event (MM/DD/YYYY)
  request(query, function(err, res, body) {
    if (err) {
        console.log('Error: ' + err);
    }
    
    if (!err && res.statusCode === 200) {
      var data = JSON.parse(body);
      //Don't say anything if there are no results
      if (!data.length) {
        console.log('Sorry nothing found for ' + artist);
      } else {
          console.log('Upcoming Events for ' + artist);
          data.forEach(concert => {
              console.log("Venue: " + concert.venue.name);
              console.log("Location: " + concert.venue.latitude + " " + concert.venue.longitude);
              console.log(concert.venue.city + ' ' + concert.venue.region + ' ' + concert.venue.country);
              //format datetime to MM/DD/YYYY
              console.log('Date: ' + moment(concert.datetime).format('MM/DD/YYYY') + '\n');
          });

      }
    }

  });
}

//Uses Spotify to search for songs
//displays song info: song name, Preview Link from spotify, song album
//Gives 'The Sign' by Ace of Base as default
function spotifyThis (song) {
  spotify
  .search({type: 'track', query: song})
  .then(function(data) {
    var track = data.tracks.items[0];
    var artists = findArtists(track);
    console.log('Artist(s): ' + artists)
    console.log('Song Name: ' + track.name);
    console.log('Preview: ' + track.preview_url);
    console.log('Album: ' + track.album.name); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });

}

//finds artists from track object
function findArtists (track) {
    var artists = [];
    track.artists.forEach(element => {
        artists.push(element.name);
    });
    return artists;
}

//Uses OMDB api to get: Title, year, IMDB rating, Rotten Tomatoes Rating
//Country of Production, Language, Plot, actors.
//default mr.Nobody
function movieThis(movie) {
    var query = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
    request(query, function(err, res, body) {
        if (err) {
            console.log('Error: ' + err);
        }
        // If the request is successful
        if (!err && res.statusCode === 200) {
          var omdb = JSON.parse(body);
          console.log('Title: ' + omdb.Title);
          console.log('Year: ' + omdb.Year);
          console.log('IMDB: '  + omdb.imdbRating + '/10');
          console.log('Rotten Tomatoes: ' + omdb.Ratings[1].Value);
          console.log('Country: ' + omdb.Country);
          console.log('Language: ' + omdb.Language);
          console.log('Plot: '+ omdb.Plot);
          console.log('Starring: ' + omdb.Actors);
        }
      })

}

//Uses fs to read random.txt and executes its contents
function doWhat () {

}
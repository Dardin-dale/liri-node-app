# liri-node-app
Language interpretation and recognition interface. Liri will interpret command line instructions in Node. an additional environment file containing your spotify api keys will need to be created in order to use all of the functions contained in this project.

Liri takes in the following Commands:
  *concert-this
  *spotify-this-song
  *movie-this
  *do-what-it-says
  
 ## concert-this (artist)
 concert-this accepts an artist name and  will search the Bands in Town API and print the all of the upcoming events for the artist.
   example:
  ![GitHub Logo](/Pictures/concert-this.PNG)

## spotify-this-song (song)
spotify-this-song searches the node-spotify-api and return info about the song.
  example:
![GitHub Logo](/Pictures/spotify-song.PNG)

## movie-this (movie)
movie-this searched the OMDB API for information about the selected movie.
  example:
![GitHub Logo](/Pictures/movie-this.PNG)

## do-what-it-says
do what it says will read the contents of the random.txt file contained in the project and executes the liri command for the specified input. The input in random.txt should follow the format liri-command,search-value with no additional white-space.
  example:
  ![GitHub Logo](/Pictures/do-what-it-says.PNG)

let express = require('express');
let app = express();

// serve static files from public folder
app.use(express.static('public'));

// kendrick v drake data
let songs = [
    {
      "Artist": "Drake",
      "Song Title": "First Person Shooter",
      "Release Year": 2023,
      "Date": "10/6/2023",
      "Genius Views": "1,200,000",
      "Link": "https://genius.com/Drake-first-person-shooter-lyrics",
      "Availability on Spotify?": "Y",
      "Danceability": 0.475,
      "Energy": 0.655,
      "Tempo": 163.997,
      "Speechiness": 0.33,
      "Valence": 0.245,
      "Artist Popularity": 96,
      "Monthly Listeners": 75259674
    },
    {
      "Artist": "Kendrick Lamar",
      "Song Title": "Like That",
      "Release Year": 2024,
      "Date": "3/22/2024",
      "Genius Views": "3,100,000",
      "Link": "https://genius.com/Future-metro-boomin-and-kendrick-lamar-like-that-lyrics",
      "Availability on Spotify?": "Y",
      "Danceability": 0.814,
      "Energy": 0.676,
      "Tempo": 162.012,
      "Speechiness": 0.231,
      "Valence": 0.312,
      "Artist Popularity": 92,
      "Monthly Listeners": 65469006
    },
    {
      "Artist": "Drake",
      "Song Title": "Push Ups",
      "Release Year": 2024,
      "Date": "4/19/2024",
      "Genius Views": "3,400,000",
      "Link": "https://en.wikipedia.org/wiki/Drake%E2%80%93Kendrick_Lamar_feud#%22First_Person_Shooter%22_and_%22Like_That%22",
      "Availability on Spotify?": "Y",
      "Danceability": 0.598,
      "Energy": 0.696,
      "Tempo": 91.057,
      "Speechiness": 0.112,
      "Valence": 0.209,
      "Artist Popularity": 96,
      "Monthly Listeners": 75259674
    },
    {
      "Artist": "Kendrick Lamar",
      "Song Title": "euphoria",
      "Release Year": 2024,
      "Date": "4/30/2024",
      "Genius Views": "10,000,000",
      "Link": "https://genius.com/Kendrick-lamar-euphoria-lyrics",
      "Availability on Spotify?": "Y",
      "Danceability": 0.831,
      "Energy": 0.643,
      "Tempo": 139.948,
      "Speechiness": 0.11,
      "Valence": 0.142,
      "Artist Popularity": 92,
      "Monthly Listeners": 65469006
    },
    {
      "Artist": "Drake",
      "Song Title": "Family Matters",
      "Release Year": 2024,
      "Date": "5/3/2024",
      "Genius Views": "4,300,000",
      "Link": "https://genius.com/Drake-family-matters-lyrics",
      "Availability on Spotify?": "Y",
      "Danceability": 0.527,
      "Energy": 0.492,
      "Tempo": 164.005,
      "Speechiness": 0.279,
      "Valence": 0.234,
      "Artist Popularity": 96,
      "Monthly Listeners": 75259674
    },
    {
      "Artist": "Kendrick Lamar",
      "Song Title": "meet the grahams",
      "Release Year": 2024,
      "Date": "5/3/2024",
      "Genius Views": "5,200,000",
      "Link": "https://genius.com/Kendrick-lamar-meet-the-grahams-lyrics",
      "Availability on Spotify?": "Y",
      "Danceability": 0.479,
      "Energy": 0.802,
      "Tempo": 74.98,
      "Speechiness": 0.309,
      "Valence": 0.602,
      "Artist Popularity": 92,
      "Monthly Listeners": 65469006
    },
    {
      "Artist": "Kendrick Lamar",
      "Song Title": "Not Like Us",
      "Release Year": 2024,
      "Date": "5/4/2024",
      "Genius Views": "9,400,000",
      "Link": "https://genius.com/Kendrick-lamar-not-like-us-lyrics",
      "Availability on Spotify?": "Y",
      "Danceability": 0.898,
      "Energy": 0.472,
      "Tempo": 101.061,
      "Speechiness": 0.0776,
      "Valence": 0.214,
      "Artist Popularity": 92,
      "Monthly Listeners": 65469006
    }
  ]


// route to get all songs
app.get('/songs', (request, response) => {
    response.json(songs);
});

// route with path parameter to get songs by artist
app.get('/songs/:artist', (request, response) => {
    let artistName = request.params.artist;
    let artistSongs = songs.filter(song => 
        song.Artist.toLowerCase() === artistName.toLowerCase()
    );
    
    if (artistSongs.length > 0) {
        response.json(artistSongs);
    } else {
        response.json({status: "Artist not found"});
    }
});

app.listen(3000, () => {
    console.log("app is listening at localhost:3000");
});
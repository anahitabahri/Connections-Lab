// define genres and colors
var genres = ["Hip Hop", "Pop", "Country", "Rock", "R&B"];
var genreColors = {
  "Hip Hop": "#f54242",
  "Pop": "#42f5da",
  "Country": "#f5e642",
  "Rock": "#42a7f5",
  "R&B": "#c642f5"
};

// create fake dataset with random popularity and tempo
var data = genres.map(genre => {
  let songs = [];
  for (let i = 1; i <= 10; i++) {
    songs.push({
      name: `Song ${i}`, 
      popularity: Math.floor(Math.random() * 100) + 1, // random popularity 1-100
      tempo: Math.floor(Math.random() * 80) + 60, // random tempo 60-140 BPM
      x: Math.random() * 100, // random x-position (popularity)
      y: Math.random() * 100 // random y-position (danceability)
    });
  }
  return { genre, songs };
});

// create the bubbles (scatter plot layout)
function createBubbles() {
    var container = document.querySelector('.grid-container');
    var containerWidth = container.offsetWidth;
    var containerHeight = container.offsetHeight;
  
    data.forEach(genreData => {
      genreData.songs.forEach(song => {
        var bubble = document.createElement('div');
        bubble.classList.add('bubble');
  
        // set color based on genre
        bubble.style.backgroundColor = genreColors[genreData.genre];
  
        // set initial size based on popularity
        var size = song.popularity;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
  
        // scatter plot positioning based on random positions within the container
        // calculate positions to ensure bubbles stay within the container
        bubble.style.left = (Math.random() * (containerWidth - size)) + "px"; // random x-position
        bubble.style.top = (Math.random() * (containerHeight - size)) + "px"; // random y-position
  
        // add hover effect and text
        bubble.addEventListener('mouseover', function () {
          bubble.style.transform = `scale(3)`; // make circle larger
          let textDiv = document.createElement('div');
          textDiv.classList.add('bubble-text');
          textDiv.innerHTML = `${genreData.genre}: ${song.name}, Popularity: ${song.popularity}, Tempo: ${song.tempo}`;
          bubble.appendChild(textDiv);
        });
  
        bubble.addEventListener('mouseout', function () {
          bubble.style.transform = `scale(1)`; // reset size
          bubble.innerHTML = ""; // remove text
        });
  
        container.appendChild(bubble);
      });
    });
}


createBubbles();

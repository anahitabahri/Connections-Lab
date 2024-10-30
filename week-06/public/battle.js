// global variables to track user interaction and attribution display
let hasInteracted = false;
let attributionShown = false;

// load the dataset from /songs
fetch('/songs')
    .then(response => response.json())
    .then(data => {
        
        // static data for total genius views and monthly listeners
        const totalViews = {
            'Drake': 12000000,
            'Kendrick Lamar': 30000000
        };

        const monthlyListeners = {
            'Drake': 75259674,
            'Kendrick Lamar': 65469006
        };

        // event listeners for each battle metric
        document.getElementById('danceabilityLink').addEventListener('click', () => {
            showComparisonResult('Danceability');
        });

        document.getElementById('valenceLink').addEventListener('click', () => {
            showComparisonResult('Valence');
        });

        document.getElementById('popularityLink').addEventListener('click', () => {
            showComparisonResult('Artist Popularity');
        });

        document.getElementById('viewsLink').addEventListener('click', () => {
            showStaticResult('Total Genius Views', totalViews);
        });

        document.getElementById('listenersLink').addEventListener('click', () => {
            showStaticResult('Monthly Listeners', monthlyListeners);
        });

        // function to handle comparison metrics (danceability, valence, popularity)
        function showComparisonResult(metric) {
            const drakeValue = getMaxMetricValue(data, metric, 'Drake');
            const kendrickValue = getMaxMetricValue(data, metric, 'Kendrick Lamar');
            const winner = drakeValue > kendrickValue ? 'Drake' : 'Kendrick Lamar';
            const loser = winner === 'Drake' ? 'Kendrick Lamar' : 'Drake';
            const winnerValue = winner === 'Drake' ? drakeValue : kendrickValue;
            const loserValue = loser === 'Drake' ? drakeValue : kendrickValue;
            showResult(winner, loser, metric, winnerValue, loserValue);
        }

        // function to handle static metrics (total genius views, monthly listeners)
        function showStaticResult(metric, dataObject) {
            const drakeValue = dataObject['Drake'];
            const kendrickValue = dataObject['Kendrick Lamar'];
            const winner = kendrickValue > drakeValue ? 'Kendrick Lamar' : 'Drake';
            const loser = winner === 'Drake' ? 'Kendrick Lamar' : 'Drake';
            const winnerValue = winner === 'Drake' ? drakeValue : kendrickValue;
            const loserValue = loser === 'Drake' ? drakeValue : kendrickValue;
            showResult(winner, loser, metric, winnerValue, loserValue);
        }

        // function to display the battle result
        function showResult(winner, loser, metric, winnerValue, loserValue) {
            const resultDiv = document.getElementById('result');
            const winnerImage = document.getElementById('winnerImage');
            const attributionDiv = document.getElementById('imageAttribution');
            const lyricsLinkDiv = document.getElementById('lyricsLink');
            
            // remove show classes to trigger re-animation
            resultDiv.classList.remove('show');
            winnerImage.classList.remove('show');
            
            setTimeout(() => {
                // display artist names (use "Kendrick" instead of "Kendrick Lamar" for display)
                const displayWinner = winner === 'Kendrick Lamar' ? 'Kendrick' : winner;
                const displayLoser = loser === 'Kendrick Lamar' ? 'Kendrick' : loser;
                
                // create HTML for both results
                resultDiv.innerHTML = `
                    <div class="winner">${displayWinner} wins with ${formatValue(winnerValue, metric)}</div>
                    <div class="runner-up">${displayLoser}: ${formatValue(loserValue, metric)}</div>
                `;
                resultDiv.classList.add('show');
                
                // set and display the winner's image
                winnerImage.src = winner === 'Drake' ? 'drake.png' : 'kendrick.png';
                winnerImage.style.display = 'block';
                
                // show image attribution on first interaction
                if (!attributionShown) {
                    attributionDiv.innerHTML = `Illustrations by <a href="https://www.cavsconnect.com/opinion/2024/05/24/kendrick-lamar-disgraces-drake-through-diss-tracks/#modal-photo" target="_blank" rel="noopener noreferrer">Nicolas Soto</a>, possibly from a high school in Florida (woah)`;
                    attributionDiv.classList.add('show');
                    attributionShown = true;
                }
                
                // animate the winner image
                setTimeout(() => {
                    winnerImage.classList.add('show');
                }, 50);

                // show lyrics link after first interaction
                if (!hasInteracted) {
                    hasInteracted = true;
                    setTimeout(() => {
                        lyricsLinkDiv.classList.add('show');
                    }, 1000);  // Delay the appearance by 1 second
                }
            }, 50);
        }

        // function to get the maximum metric value for an artist
        function getMaxMetricValue(data, metric, artist) {
            let maxValue = -Infinity;
            data.forEach(song => {
                if (song['Artist'] === artist && song['Availability on Spotify?'] === 'Y') {
                    const value = parseFloat(song[metric]);
                    if (!isNaN(value) && value > maxValue) {
                        maxValue = value;
                    }
                }
            });
            return maxValue === -Infinity ? 0 : maxValue;
        }

        // function to format the displayed value based on the metric
        function formatValue(value, metric) {
            if (metric === 'Danceability' || metric === 'Valence') {
                return value.toFixed(3);  // display 3 decimal places for these metrics
            } else if (metric === 'Total Genius Views' || metric === 'Monthly Listeners') {
                return value.toLocaleString();  // add commas for large numbers
            } else {
                return value;
            }
        }
    })
    .catch(error => console.error('Error loading the dataset:', error));

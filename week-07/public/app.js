window.addEventListener('load', () => {

    // PART 1: PHOTO PREVIEW
    document.getElementById('photo-input').addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file) {
            // create a FileReader object to read the image file
            const reader = new FileReader();
            
            // when the reader finishes loading the file...
            reader.onload = function(e) {
                // get the preview image element
                const preview = document.getElementById('photo-preview');
                // set its source to the loaded file data (base64 encoded image)
                preview.src = e.target.result;
                // make it visible
                preview.style.display = 'block';
            }
            // start reading the file as a data URL
            reader.readAsDataURL(file);
        }
    });

    // PART 2: SUBMIT SIGHTING
    document.getElementById('submit-sighting').addEventListener('click', () => {
        // get the input elements
        const photoInput = document.getElementById('photo-input');
        const locationInput = document.getElementById('location-input');

        // check if a photo was selected
        if (!photoInput.files[0]) {
            alert('babes you forgot to select a photo');
            return;
        }

        // create a FileReader to read the photo file
        const reader = new FileReader();
        
        // when the reader finishes loading the file...
        reader.onload = function(e) {
            // create an object with our data
            let obj = {
                photo: e.target.result,  
                location: locationInput.value.toLowerCase() || '  🤷🏽‍♀️🤷🏽‍♀️🤷🏽‍♀️'
            }

            // send the data to server
            fetch('/newSighting', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            .then(response => response.json())
            .then(data => {
                if (data.task === "success") {
                    // clear the form
                    photoInput.value = '';
                    locationInput.value = '';
                    document.getElementById('photo-preview').style.display = 'none';
                }
            });
        };
        // start reading the photo file as a data URL
        reader.readAsDataURL(photoInput.files[0]);
    });

    // PART 3: DISPLAY SIGHTINGS
    document.getElementById('get-sightings').addEventListener('click', () => {
        // get the sightings from server
        fetch('/getSightings')
        .then(response => response.json())
        .then(data => {
            // clear the existing sightings display
            document.getElementById('sightings-info').innerHTML = '';
            
            // Fforor each sighting in our data (in reverse order, newest first)
            data.data.reverse().forEach(sighting => {
                // create a new div for this sighting
                let card = document.createElement('div');
                card.className = 'sighting-card';
                
                // fill it with the sighting's image and location
                card.innerHTML = `
                    <img src="${sighting.photo}" class="sighting-image" alt="Cybertruck sighting">
                    <p>📍 ${sighting.location}</p>
                `;
                
                // add this card to our sightings display
                document.getElementById('sightings-info').appendChild(card);
            });
        });
    });
});
// select centered images and hover text elements
var images = document.querySelectorAll('.centered img');
var hoverTexts = document.querySelectorAll('.hover-text');

// add event listeners to each image for mouse enter and leave events
images.forEach(img => {
    // show corresponding hover text on mouse enter
    img.addEventListener('mouseenter', () => {
        var textId = img.getAttribute('data-text'); // get id of text to display
        var textElement = document.getElementById(textId);
        if (textElement) {
            textElement.style.display = 'block'; // show hover text
        }
    });

    // hide hover text on mouse leave
    img.addEventListener('mouseleave', () => {
        var textId = img.getAttribute('data-text');
        var textElement = document.getElementById(textId);
        if (textElement) {
            textElement.style.display = 'none'; // hide hover text
        }
    });

    // show word cloud on image click
    img.addEventListener('click', () => {
        const textId = img.getAttribute('data-text');
        if (textId === "kendrick-text") {
            createWordCloud(wordsKendrick); // create Kendrick's word cloud
        } else if (textId === "drake-text") {
            createWordCloud(wordsDrake); // create Drake's word cloud
        }
    });
});

var lyricsDrake = `Baby, I like your style
Grips on your waist
Front way, back way
You know that I don't play
Streets not safe
But I never run away
Even when I'm away
OT, OT, there's never much love when we go OT
I pray to make it back in one piece
I pray, I pray
That's why I need a one dance
Got a Hennessy in my hand
One more time 'fore I go
Higher powers taking a hold on me
I need a one dance
Got a Hennessy in my hand
One more time 'fore I go
Higher powers taking a hold on me
Baby, I like your style
Strength and guidance
All that I'm wishin' for my friends
Nobody makes it from my ends
I had to bust up the silence
You know you gotta stick by me
Soon as you see the text, reply me
I don't wanna spend time fighting
We've got no time
And that's why I need a one dance
Got a Hennessy in my hand
One more time 'fore I go
Higher powers taking a hold on me
I need a one dance
Got a Hennessy in my hand
One more time 'fore I go
Higher powers taking a hold on me
Got a pretty girl and she love me long time
Wine it, wine it, and she love me long time
Ooh yeah, just steady and wine up
Back up, back up, back up and wine up
Back up, back up and wine it
Girl, just back up, back up, back up and wine down
Ooh yeah, just steady and wine up
Back, up, back up and wine it, girl
Ooh, tell me
I need to know, where do you wanna go?
'Cause if you're down, I'll take it slow
Make you lose control
Where, where, where
Where, where, where, where (ooh yeah, very long time)
(Back, up, back up and wine it, girl)
'Cause if you're down (back up, back up and)
'Cause if you're down (back up, back up and)
'Cause if you're down (back up, back up and)
I need a one dance
Got a Hennessy in my hand
One more time 'fore I go
Higher powers taking a hold on me
I need a one dance
Got a Hennessy in my hand
One more time 'fore I go
Higher powers taking a hold on me`;

var lyricsKendrick = `Nobody pray for me
It been that day for me
Way
Yeah, yeah!
Ayy, I remember syrup sandwiches and crime allowances
Finesse on 'em with some counterfeits, but now I'm countin' this
Parmesan where my accountant lives, in fact, I'm downin' this
D'USSÉ with my boo bae tastes like Kool-Aid for the analysts
Girl, I can buy yo' ass the world with my paystub
I know that it's good, won't you sit it on my taste bluds?
I get way too petty once you let me do the extras
Pull up on your block, then break it down, we playin' Tetris
A.m. to the p.m., p.m. to the a.m., funk
Eat up your per diem, you just gotta hate 'em, funk
If I quit your BM, I still ride Mercedes, funk
If I quit this season, I still be the greatest, funk
My left stroke just went viral
Right stroke put lil' baby in a spiral
Soprano C, we like to keep it on a high note
It's levels to it, you and I know
Tell 'em, be humble (hol' up)
Sit down (hol' up, hol' up, lil', hol' up)
Be humble (hol' up)
Sit down (hol' up, sit down, lil', sit down, lil')
Be humble (hol' up, hol' up)
Sit down (hol' up, hol' up, lil', hol' up)
Be humble (hol' up)
Sit down (hol' up, hol' up, hol' up)
Be humble (hol' up, hol' up)
Sit down (hol' up, hol' up, lil', hol' up, lil')
Be humble (hol' up)
Sit down (hol' up, sit down, lil', sit down, lil')
Be humble (hol' up, hol' up)
Sit down (hol' up, hol' up, lil', hol' up)
Be humble (hol' up)
Sit down (hol' up, hol' up, hol' up, hol' up)
Who dat -a thinkin' that he frontin' on Man-Man? (Man-Man)
Get the f- off my stage, I'm the Sandman (Sandman)
Get the f- off my (ayy), that ain't right
I make a play blowing up your whole life
I'm so, so sick and tired of the Photoshop
Show me somethin' natural like afro on Richard Pryor
Show me somethin' natural, I wanna feel some stretch marks
Still I take you down right on your mama couch in Polo socks
Ayy, this shit way too crazy, ayy, you do not amaze me, ayy
I blew cool from AC, ayy, Obama just paged me, ayy
I don't fabricate it, ayy, most of y'all be fakin', ayy
I stay modest 'bout it, ayy, she elaborate it, ayy
This that Grey Poupon, that Evian, that TED Talk, ayy
Watch my soul speak, you let the meds talk, ayy
If I kill a, uhm, it won't be the alcohol, ayy
I'm the realest, uhm, after all
Tell 'em, be humble (hol' up)
Sit down (hol' up, hol' up, lil')
Be humble (hol' up)
Sit down (hol' up, sit down, lil', sit down, lil')
Tell 'em sit down (hol' up, hol' up, lil' hol' up)
Be humble (hol' up)
Sit down (hol' up, hol' up, hol' up, hol' up)
Be humble (hol' up, hol' up)
Sit down (hol' up, hol' up, lil' hol' up, lil')`;

// define stop words to remove from the analysis (to be completed in python for actual project)
var stopWords = [
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your",
    "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she",
    "her", "hers", "herself", "it", "its", "itself", "they", "them", "their",
    "theirs", "themselves", "what", "which", "who", "whom", "this", "that",
    "these", "those", "am", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an",
    "the", "and", "but", "if", "or", "because", "as", "until", "while", "of",
    "at", "by", "for", "with", "about", "against", "between", "into", "through",
    "during", "before", "after", "above", "below", "to", "from", "up", "down",
    "in", "out", "on", "off", "over", "under", "again", "further", "then",
    "once", "here", "there", "when", "where", "why", "how", "all", "any",
    "both", "each", "few", "more", "most", "other", "some", "such", "no",
    "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s",
    "t", "can", "will", "just", "don", "should", "now"
];

// function to count word occurrences and filter out stop words
function countWords(lyrics) {
    var wordCount = {};
    var words = lyrics.toLowerCase().match(/\w+/g); // convert lyrics to lowercase and split into words

    // count occurrences of each word
    words.forEach(word => {
        if (!stopWords.includes(word)) { // exclude stop words
            wordCount[word] = (wordCount[word] || 0) + 1; // increment the count
        }
    });

    // transform word counts into an array of objects for D3
    return Object.entries(wordCount).map(([text, count]) => ({
        text: text,
        size: count * 10 // Adjust size based on frequency
    }));
}

// prepare word arrays for each artist
var wordsDrake = countWords(lyricsDrake);
var wordsKendrick = countWords(lyricsKendrick);

// function to create a word cloud
function createWordCloud(words) {
    var width = 600; //  word cloud width
    var height = 400; // word cloud height

    // prepare word cloud element
    d3.select("#word-cloud")
        .style("display", "block") // show the word cloud
        .selectAll("*").remove(); // clear previous word clouds

    // set up D3 layout for word cloud
    var layout = d3.layout.cloud()
        .size([width, height]) 
        .words(words) 
        .padding(10) // padding between words
        .rotate(() => Math.random() * 2 * 90) // randomly rotate words
        // .fontSize(d => d.size) // set font size based on frequency
        .fontSize(d => Math.min(d.size, 100)) // setting a maximum font size 
        .on("end", draw); // call draw function when layout is complete

    layout.start(); // start the layout process

    // function to draw the words in the word cloud
    function draw(words) {
        var colorScale = d3.scaleOrdinal(d3.schemeSet3); // color scale for words
    
        // create an SVG for the word cloud
        d3.select("#word-cloud")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`) // center the words
            .selectAll("text")
            .data(words) // bind the word data
            .enter().append("text") // create text elements
            .style("font-size", d => `${d.size}px`) // set font size
            .style("fill", d => colorScale(d.text)) // apply the color scale
            .attr("text-anchor", "middle") // center the text
            .attr("transform", d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`) // position and rotate the text
            .text(d => d.text); // set the text content
    }
}

// attach click event listener to the document body
document.body.addEventListener('click', (event) => {
    var wordCloud = document.getElementById('word-cloud');
    // check if the click was inside any of the images
    var clickedInsideImage = Array.from(images).some(img => img.contains(event.target));
    
    // hide the word cloud if the click was outside the images
    if (!clickedInsideImage) {
        wordCloud.style.display = 'none';
    }
});

// set up dimensions
const width = Math.min(1200, window.innerWidth - 40);
const height = Math.min(800, window.innerHeight - 200);

// create SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// create tooltip
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// load and process data
d3.json("words_df.json").then(data => {
    // sort data by absolute log_odds value and take top words
    data.sort((a, b) => Math.abs(b.log_odds) - Math.abs(a.log_odds));
    const topWords = data.slice(0, 100);

    // create color scales for Kendrick and Drake
    const kendrickColor = d3.scaleLinear()
        .domain([0, 2.06]) // based on range in dataset
        .range(["#FFD700", "#FF4500"]); // Gold to Red-Orange

    const drakeColor = d3.scaleLinear()
        .domain([-3.7, 0]) // based on range in dataset
        .range(["#4B0082", "#1E90FF"]); // Indigo to Dodger Blue

    // function to determine color based on log odds
    function getColor(d) {
        return d.log_odds >= 0 ? kendrickColor(d.log_odds) : drakeColor(d.log_odds);
    }

    // create radius scale based on total frequency
    const radiusScale = d3.scaleSqrt()
        .domain(d3.extent(topWords, d => d.kendrick_frequency + d.drake_frequency))
        .range([5, 30]); // minimum and maximum radius

    // generate positions for words
    const positions = topWords.map((d, i) => ({
        x: (width - 40) * Math.random() + 20, // Random x position
        y: (height - 40) * Math.random() + 20, // Random y position
        word: d.word,
        frequency: d.kendrick_frequency + d.drake_frequency,
        leaning: d.log_odds >= 0 ? "👑 Kendrick" : "🦉 Drake",
        color: getColor(d),
        radius: radiusScale(d.kendrick_frequency + d.drake_frequency)
    }));

    // add circles for each word
    const circles = svg.selectAll("circle")
        .data(positions)
        .enter().append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.radius)
        .attr("fill", d => d.color)
        .attr("opacity", 0)
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip);

    // animate circles
    circles.transition()
        .duration(1000)
        .attr("opacity", 0.8);

    // tooltip functions
    function showTooltip(event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(`Word: <strong>${d.word}</strong><br>
                      Total Frequency: ${d.frequency}x<br>
                      ${d.leaning}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    }

    function hideTooltip() {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    }

    // add legend
    // const legend = svg.append("g")
    //     .attr("class", "legend")
    //     .attr("transform", `translate(${width - 150}, 20)`);

    // legend.append("circle")
    //     .attr("cx", 0)
    //     .attr("cy", 0)
    //     .attr("r", 6)
    //     .style("fill", kendrickColor(1));

    // legend.append("circle")
    //     .attr("cx", 0)
    //     .attr("cy", 25)
    //     .attr("r", 6)
    //     .style("fill", drakeColor(-1));

    // legend.append("text")
    //     .attr("x", 15)
    //     .attr("y", 4)
    //     .text("Kendrick")
    //     .style("font-size", "12px")
    //     .attr("alignment-baseline", "middle");

    // legend.append("text")
    //     .attr("x", 15)
        .attr("y", 29)
        .text("Drake")
        .style("font-size", "12px")
        .attr("alignment-baseline", "middle");
});

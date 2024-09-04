let caterpillars = [];
let caterpillarTimer = 0;
let flowerCount = 0;
const canvasHeight = 150; // Adjust to match your new header height
const colors = [
  '#A8D8EA', // Soft Blue
  '#AA96DA', // Soft Purple
  '#FCBAD3', // Soft Pink
  '#FFFFD2', // Soft Yellow
  '#95E1D3'  // Soft Teal
];
let recentColors = []; // To track the colors of the last two caterpillars

function setup() {
  // Create the canvas and append it to the canvas-container div
  let canvas = createCanvas(windowWidth, canvasHeight);
  canvas.parent('canvas-container');
  
  // Initialize a couple of caterpillars at the start
  caterpillars.push(new Caterpillar(0));
  caterpillars.push(new Caterpillar(1));
}

function draw() {
  background(255);

  // Manage caterpillars if no flowers have been created yet
  manageCaterpillars();
}

class Caterpillar {
  constructor(row) {
    this.row = row; // 0 for top, 1 for bottom
    this.x = this.row === 0 ? -50 : width + 50; // Start off-screen
    this.y = this.row === 0 ? canvasHeight * 0.3 : canvasHeight * 0.7; // Adjust position for smaller height
    this.speed = random(0.8, 1.2); // Increased speed
    this.direction = this.row === 0 ? 1 : -1; // 1 for right, -1 for left
    this.size = random(30, 50);
    this.color = this.getUniqueColor();
  }

  getUniqueColor() {
    let availableColors = colors.filter(color => !recentColors.includes(color));
    if (availableColors.length === 0) {
      availableColors = colors; // If we exhausted all unique colors, use all available colors again
    }
    let newColor = random(availableColors);

    // Update the recent colors list
    recentColors.push(newColor);
    if (recentColors.length > 2) {
      recentColors.shift(); // Keep only the last two colors
    }

    return color(newColor);
  }

  move() {
    this.x += this.speed * this.direction;
  }

  display() {
    push();
    translate(this.x, this.y);
    if (this.direction === -1) scale(-1, 1);
    
    // Draw caterpillar segments
    for (let i = 0; i < 5; i++) {
      fill(this.color);
      ellipse(-i * this.size * 0.2, sin(i * 0.5) * this.size * 0.1, this.size * 0.3, this.size * 0.3);
    }
    
    // Draw head
    fill(this.color);
    ellipse(this.size * 0.1, 0, this.size * 0.4, this.size * 0.4);
    
    // Draw eyes
    fill(40);
    ellipse(this.size * 0.2, -this.size * 0.05, this.size * 0.05);
    ellipse(this.size * 0.2, this.size * 0.05, this.size * 0.05);
    
    // Draw antennae
    stroke(40);
    strokeWeight(this.size * 0.02);
    line(this.size * 0.25, -this.size * 0.1, this.size * 0.35, -this.size * 0.2);
    line(this.size * 0.25, this.size * 0.1, this.size * 0.35, this.size * 0.2);
    
    pop();
  }

  isOffScreen() {
    return (this.direction === 1 && this.x > width + 50) || 
           (this.direction === -1 && this.x < -50);
  }
}

function manageCaterpillars() {
  // Only manage caterpillars if no flowers have been created yet
  if (flowerCount === 0) {
    // Remove off-screen caterpillars
    caterpillars = caterpillars.filter(caterpillar => !caterpillar.isOffScreen());

    // Add new caterpillars if there's room
    caterpillarTimer++;
    if (caterpillarTimer > 180 && caterpillars.length < 2) { // Wait 3 seconds (180 frames) between caterpillar appearances
      let availableRows = [0, 1].filter(row => !caterpillars.some(caterpillar => caterpillar.row === row));
      if (availableRows.length > 0) {
        let newRow = random(availableRows);
        caterpillars.push(new Caterpillar(newRow));
        caterpillarTimer = 0;
      }
    }

    // Move and display caterpillars
    for (let caterpillar of caterpillars) {
      caterpillar.move();
      caterpillar.display();
    }
  } else {
    // If flowers have started to be created, remove all caterpillars
    caterpillars = [];
  }
}

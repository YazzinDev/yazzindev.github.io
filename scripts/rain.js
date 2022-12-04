// Create the canvas element
const canvas = document.getElementById('rain');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set up the drawing context
const ctx = canvas.getContext('2d');

// Define some constants for the raindrop appearance
const RAINDROP_WIDTH = 2;
const RAINDROP_HEIGHT = 10;
const RAINDROP_COLOR = '#6b4eca';

// Define some constants for the rain animation
const RAINDROP_COUNT = 500;
const RAINDROP_MAX_SPEED = 10;
const RAINDROP_MIN_SPEED = 20;
const WIND_MAX_STRENGTH = 0.2;
const WIND_MIN_STRENGTH = -0.2;
const RAINDROP_REPEL_STRENGTH = 3;
const RAINDROP_REPEL_RANGE = 500;

// Create an array to store the raindrops
const raindrops = [];

// Define a Raindrop class
class Raindrop {
    constructor() {
        // Set a random x and y position for the raindrop
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Set a random speed for the raindrop, between the minimum and maximum allowed speeds
        this.speed = Math.random() * (RAINDROP_MAX_SPEED - RAINDROP_MIN_SPEED) + RAINDROP_MIN_SPEED;

        // Set a random wind strength for the raindrop, between the minimum and maximum allowed strengths
        this.wind = Math.random() * (WIND_MAX_STRENGTH - WIND_MIN_STRENGTH) + WIND_MIN_STRENGTH;

        
    }
    // Define a method to update the raindrop position
    update() {
        // If the cursor is within range of the raindrop, apply the repel force to the raindrop
        if (cursorInRange)  {
            const dx = this.x - cursorX;
            const dy = this.y - cursorY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < RAINDROP_REPEL_RANGE) {
                this.x += dx / distance * RAINDROP_REPEL_STRENGTH;
                this.y += dy / distance * RAINDROP_REPEL_STRENGTH;
            }
        }

        // Move the raindrop along the y axis by its speed
        this.y += this.speed;
        // If the raindrop is outside the canvas along the y axis, move it back to the top
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }

        // Move the raindrop along the x axis by its wind strength
        this.x += this.wind;

        // If the raindrop is outside the canvas along the x axis, move it back in from the opposite side
        if (this.x > canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width;
        }
    }

    // Define a method to draw the raindrop
    draw() {
        

        // Apply raindrop color
        ctx.fillStyle = RAINDROP_COLOR;
        // Fill a rectangle at the raindrop's position with the defined width, height, and color
        ctx.fillRect(this.x, this.y, RAINDROP_WIDTH, RAINDROP_HEIGHT);
        
    }
}

// Create the raindrops and add them to the raindrops array
for (let i = 0; i < RAINDROP_COUNT; i++) {
    raindrops.push(new Raindrop());
}

// Capture the cursor position
let cursorX = 0;
let cursorY = 0;
let cursorInRange = false;

// Add event listeners to update the cursor position and cursorInRange
canvas.addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;

    // Check if the cursor is within range of a raindrop
    cursorInRange = false;
    for (const raindrop of raindrops) {
        const dx = raindrop.x - cursorX;
        const dy = raindrop.y - cursorY;
        if (Math.sqrt(dx * dx + dy * dy) < RAINDROP_REPEL_RANGE) {
            cursorInRange = true;
            break;
        }
    }
});
canvas.addEventListener('touchmove', (event) => {
    cursorX = event.touches[0].clientX;
    cursorY = event.touches[0].clientY;

    // Check if the cursor is within range of a raindrop
    cursorInRange = false;
    for (const raindrop of raindrops) {
        const dx = raindrop.x - cursorX;
        const dy = raindrop.y - cursorY;
        if (Math.sqrt(dx * dx + dy * dy) < RAINDROP_REPEL_RANGE) {
            cursorInRange = true;
            break;
        }
    }
});

// Define a function to update the rain animation
function updateRain() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw each raindrop
    for (const raindrop of raindrops) {
        raindrop.update();
        raindrop.draw();
    }

    // Continue updating the rain animation
    requestAnimationFrame(updateRain);
}

// Start the rain animation
updateRain();
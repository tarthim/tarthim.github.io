const app = document.getElementById("michelle-app");
const boulderWall = document.getElementById("boulder-wall");

// Positions on which to render specific boulders
const fixedPositions = [
  { left: 80, top: 90 },
  { left: 60, top: 90 },
  { left: 60, top: 85 },
  { left: 50, top: 70 },
  { left: 50, top: 60 },
  { left: 50, top: 60 },
  { left: 30, top: 40 },
  { left: 20, top: 30 },
  { left: 35, top: 10 },
];

// Generate a boulder div
const createBoulder = () => {
    // Create a new div element
    const boulder = document.createElement('div');
  
    // Set the class name for styling
    boulder.className = 'boulder';
  
    // Set the dimensions of the boulder
    const width = getRandomNumber(10, 30); // Adjust the range as needed
    const height = getRandomNumber(20, 40); // Adjust the range as needed
    boulder.style.width = width + 'px';
    boulder.style.height = height + 'px';
  
    // Generate a random border-radius for a non-uniform shape
    const borderRadius = getRandomNumber(10, 40); // Adjust the range as needed
    boulder.style.borderRadius = borderRadius + '%';
  
    // Set a background color or image to represent the boulder
    boulder.style.backgroundColor = getRandomColor(); // Adjust the color as needed
  
    // Return the created boulder element
    return boulder;
}

// Helper function to generate a random number within a given range
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Random rgb color generator
const getRandomColor = () => {
    // Generate random values for red, green, and blue channels
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
  
    // Create the CSS color string in RGB format
    const color = `rgb(${red}, ${green}, ${blue})`;
  
    // Return the random color
    return color;
}

// Generate random boulder wall with boulders of random sizes and colors
const initBoulderWall = () => {
    // Get the initial dimensions of the boulder wall
    const wallWidth = boulderWall.offsetWidth;
    const wallHeight = boulderWall.offsetHeight;

    const boulderCount = 45;
    for (let i = 0; i < boulderCount; i++) {
        let b = createBoulder();
        boulderWall.appendChild(b);
        
        // Calculate the scaling factor for the boulder
        const scaleX = wallWidth / boulderWall.offsetWidth;
        const scaleY = wallHeight / boulderWall.offsetHeight;

        // Move boulder to random coordinates inside the boulder wall
        let l = getRandomNumber(0, boulderWall.offsetWidth - b.offsetWidth);
        let t = getRandomNumber(0, boulderWall.offsetHeight - b.offsetHeight);

        // Apply scaling and positioning to the boulder
        b.style.transformOrigin = 'top left';
        b.style.transform = `scale(${scaleX}, ${scaleY}) translate(${l}px, ${t}px)`;
        b.style.position = 'absolute';
    }
}

// Generate fixed boulders
function positionFixedItems() {
    const boulderWall = document.getElementById('boulder-wall');

    fixedPositions.forEach((position) => {
      const boulder = document.createElement('div');
      boulder.className = 'boulder-fixed';
      boulder.style.left = position.left + '%';
      boulder.style.top = position.top + '%';

      const size = getRandomNumber(20, 40);
      boulder.style.width = size + 'px';
      boulder.style.height = size + 'px';
  
      boulderWall.appendChild(boulder);
    });
}
  

// Generate michelle moving around

class MovableObject {
    constructor() {
      this.element = document.getElementById('moving-object');
      this.currentIndex = 0;
      this.fixedPositions = fixedPositions;
      this.animationInterval = null;
    }
  
    move() {
      const currentPosition = this.fixedPositions[this.currentIndex];
      this.element.style.left = currentPosition.left + '%';
      this.element.style.top = currentPosition.top + '%';
  
      this.currentIndex++;
      if (this.currentIndex === this.fixedPositions.length) {
        // Clear interval
        clearInterval(this.animationInterval);
        this.finishAnimation();
      }
      else {
        if (this.currentIndex === 6) {
          this.replaceImage();
        }
      }
    }
  
    replaceImage() {
      setTimeout(() => {
        const newSrc = "./assets/michelle-smile.png";

        // Apply class for transition effect
        this.element.classList.add('replace-animation');
    
        // Triggering the transition
        setTimeout(() => {
          this.element.style.opacity = 0;
        }, 10);
    
        // Updating the image source after the transition
        setTimeout(() => {
          this.element.src = newSrc;
          this.element.style.opacity = 1;
        }, 150);
      }, 400);
    }

    startAnimation() {
      this.move();
      this.animationInterval = setInterval(() => this.move(), 500); // Adjust the interval as needed
    }

    finishAnimation() {
        console.log('Animation is finished');
        animateConfetti();
        // Small timeout before blur
        setTimeout(() => {
            // Show the last screen
            prepLastScreen();
        }, 700); // Adjust the duration as needed
    }
}


function createConfetti() {
    const confettiContainer = document.getElementById('michelle-app');
  
    // Create a confetti element
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
  
    // Set a random position for the confetti element
    const randomX = Math.random() * window.innerWidth;
    confetti.style.left = randomX + 'px';
    confetti.style.top = '-10px';
  
    // Add the confetti element to the container
    confettiContainer.appendChild(confetti);
  
    // Remove the confetti element after it falls out of the screen
    setTimeout(() => {
      confetti.remove();
    }, 7000); // Adjust the duration as needed
}
  
function animateConfetti() {
setInterval(() => {
    createConfetti();
}, 100); // Adjust the interval as needed
}

// Generate random boulder wall
initBoulderWall();
// Generate fixed items
positionFixedItems();
// Generate moving object and start animation
const movableObject = new MovableObject();
movableObject.startAnimation();


const prepLastScreen = () => {
  // Blur out the boulder wall
  boulderWall.style.filter = 'brightness(0.8) blur(5px)';

  setTimeout(() => {
    // Generate div with text "You got the job!"
    const textDiv = document.createElement('div');
    textDiv.className = 'finish-text';
    textDiv.innerHTML = '<div class="head">Tijd om te klimmen naar nieuwe hoogtes!</div><div class="sub">Veel plezier en tot snel in de klimhal!</div>';
    app.appendChild(textDiv);
  }, 500);

}


// TODO: Add Michelle her face
// TODO: Add some finishing text
// TODO: Seperate RWS and new job
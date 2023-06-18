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

const randomBoulderShapes = [
  'polygon(50% 0%, 83% 12%, 77% 31%, 80% 57%, 68% 74%, 43% 70%, 21% 60%, 21% 41%, 17% 12%)',
  'polygon(39% 0, 57% 8%, 75% 24%, 89% 44%, 61% 86%, 43% 70%, 21% 60%, 21% 41%, 29% 18%)',
  'polygon(30% 11%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 5% 36%)',
  'polygon(6% 30%, 24% 17%, 37% 9%, 73% 8%, 85% 15%, 83% 32%, 89% 60%, 81% 83%, 66% 94%, 36% 92%, 20% 86%, 9% 73%)',
  'polygon(40% 9%, 53% 16%, 60% 39%, 60% 64%, 55% 85%, 35% 91%, 23% 77%, 22% 46%, 26% 24%)'
];

// Generate a boulder div
const createBoulder = () => {
  // Create a new div element
  const boulder = document.createElement('div');

  // Set the class name for styling
  boulder.className = 'boulder';

  // Set the dimensions of the boulder
  const width = getRandomNumber(30, 50); // Adjust the range as needed
  const height = getRandomNumber(40, 60); // Adjust the range as needed
  boulder.style.width = width + 'px';
  boulder.style.height = height + 'px';

  // Generate a random border-radius for a non-uniform shape
  const borderRadius = getRandomNumber(10, 40); // Adjust the range as needed
  boulder.style.borderRadius = borderRadius + '%';

  // Set a background color or image to represent the boulder
  boulder.style.backgroundColor = getRandomColor(); // Adjust the color as needed

  // Set a random shape for the boulder
  const shape = randomBoulderShapes[getRandomNumber(0, randomBoulderShapes.length - 1)];
  boulder.style.clipPath = shape;

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

  // Set boulder count depending on view port size

  // Get width of screen
  const screenWidth = window.innerWidth;

  if (screenWidth < 800) {
    var boulderCount = 14;
  }
  else {
    var boulderCount = 30;
  }

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

      b.style.zIndex = '20';

      // Duplicate b
      let b2 = b.cloneNode(true);
      // Move b2 10 px to the right and 10px down
      b2.style.transform = `scale(${scaleX}, ${scaleY}) translate(${l + 4}px, ${t + 4}px)`;
      // Make b2 70% darker
      b2.style.filter = 'brightness(80%)';
      // Move b2 behind b
      b2.style.zIndex = '10';
      boulderWall.appendChild(b2);
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

    const size = getRandomNumber(40, 60);
    boulder.style.width = size + 'px';
    boulder.style.height = size + 'px';

    // Set a random shape for the boulder
    const shape = randomBoulderShapes[getRandomNumber(0, randomBoulderShapes.length - 1)];
    boulder.style.clipPath = shape;
    boulder.style.zIndex = '20';

    boulderWall.appendChild(boulder);

    // Duplicate boulder
    let boulderShadow = boulder.cloneNode(true);
  
    // Move b2 10px left and down
    boulderShadow.style.left = 'calc(' + position.left + '%' + ' + 5px)';
    boulderShadow.style.top = 'calc(' + position.top  + '%' + ' + 5px)';

    // Make b2 70% darker
    boulderShadow.style.backgroundColor = 'rgb(45, 30, 30)';

    // Move b2 behind b
    boulderShadow.style.zIndex = '10';

    boulderWall.appendChild(boulderShadow);
  });

  // Add start indicators
  const startIndicatorFirst = document.createElement('div');
  startIndicatorFirst.className = 'boulder-indicator';
  startIndicatorFirst.style.left = fixedPositions[0].left + '%';
  startIndicatorFirst.style.top = fixedPositions[0].top + '%';
  boulderWall.appendChild(startIndicatorFirst);

  const startIndicatorSecond = document.createElement('div');
  startIndicatorSecond.className = 'boulder-indicator';
  startIndicatorSecond.style.left = 'calc(' + fixedPositions[0].left + '%' + ' + 10px)';
  startIndicatorSecond.style.top = 'calc(' + fixedPositions[0].top  + '%' + ' + 10px)';
  boulderWall.appendChild(startIndicatorSecond);

  // Add end indicator to last boulder
  const endIndicator = document.createElement('div');
  endIndicator.className = 'boulder-indicator end';
  endIndicator.style.left = 'calc(' + fixedPositions[fixedPositions.length - 1].left + '%' + ' - 10px)';
  endIndicator.style.top = 'calc(' + fixedPositions[fixedPositions.length - 1].top + '%' + ' + 10px)';
  boulderWall.appendChild(endIndicator);
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
    // Wait for 1 second at the first boulder before continuing
    setTimeout(() => {
      this.animationInterval = setInterval(() => this.move(), 500); // Adjust the interval as needed
    }, 1000);
  }

  finishAnimation() {
    animateConfetti();
    // Small timeout before blur
    setTimeout(() => {
        // Show the last screen
        prepLastScreen();
    }, 700); // Adjust the duration as needed
  }
}

function createConfetti(isBoulder = false) {
  const confettiContainer = document.getElementById('michelle-app');

  // Create a confetti element
  const confetti = document.createElement('div');

  // Set a random position for the confetti element
  const randomX = Math.random() * window.innerWidth;
  confetti.style.left = randomX + 'px';
  confetti.style.top = '-10px';

  // Set the texture as the background image of the div
  confetti.style.backgroundColor = getRandomColor();

  // Set a random animation: confetti-fall XXs linear forwards length
  const randomDuration = Math.random() * 5 + 5; // Adjust the range as needed
  confetti.style.animation = `confetti-fall ${randomDuration}s linear forwards`;

  if (isBoulder) {
    confetti.classList.add('confetti-boulder');

    // Set random width and height between 10 en 50 pixels
    const randomWidth = getRandomNumber(40, 60); // Adjust the range as needed
    confetti.style.width = randomWidth + 'px';
    const randomHeight = getRandomNumber(30, 50); // Adjust the range as needed
    confetti.style.height = randomHeight + 'px';

    // Set a random shape for the boulder
    const shape = randomBoulderShapes[getRandomNumber(0, randomBoulderShapes.length - 1)];
    confetti.style.clipPath = shape;

  } else {
    confetti.classList.add('confetti');
  }

  // Add the confetti element to the container
  confettiContainer.appendChild(confetti);

  // Remove the confetti element after it falls out of the screen
  setTimeout(() => {
    confetti.remove();
  }, 10000); // Adjust the duration as needed
}

function animateConfetti() {
  setInterval(() => {
    // Create confetti
    createConfetti();
    // Create boulder confetti
    createConfetti(true);
  }, 300); // Adjust the interval as needed
}

// Generate random boulder wall
initBoulderWall();
// Generate fixed items
positionFixedItems();
// Generate moving object and start animation
const movableObject = new MovableObject();

// Wait for 2 seconds
setTimeout(() => {
  // Start animation
  movableObject.startAnimation();
}, 2000); // Adjust the duration as needed

// Called through movable object when it is done moving
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
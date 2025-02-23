// Track if "No" button has been clicked
let noButtonMoved = false;

function selectOption(option) {
  if (option === 'yes') {
    // Hide the "No" button when "Yes" is clicked
    document.getElementById('no-button').style.display = 'none';

    // Flash colors for 2 seconds, then display cat-heart.gif
    flashRainbowColors(function() {
      document.getElementById('question').style.display = 'none'; // Hide the question
      displayCatHeart(); // Show cat-heart.gif
    });
  } else if (option === 'no') {
    let noButton = document.getElementById('no-button');

    // If it's the first time "No" is clicked, set its position to absolute
    if (!noButtonMoved) {
        // Get the current position relative to the viewport
        let rect = noButton.getBoundingClientRect();
        // Set fixed positioning using the current coordinates
        noButton.style.position = 'fixed';
        noButton.style.left = rect.left + 'px';
        noButton.style.top = rect.top + 'px';
        // Detach from the container so it's directly under body
        document.body.appendChild(noButton);
        noButtonMoved = true;
      }
      
      // Define safe boundaries
      const safeMargin = 20;
      const leftBound = safeMargin;
      const rightBound = window.innerWidth - noButton.offsetWidth - safeMargin;
      const topBound = safeMargin;
      const bottomBound = window.innerHeight - noButton.offsetHeight - safeMargin;
      
      // Generate random coordinates within the safe bounds
      const randomX =
        leftBound + Math.floor(Math.random() * (rightBound - leftBound + 1));
      const randomY =
        topBound + Math.floor(Math.random() * (bottomBound - topBound + 1));
      
      requestAnimationFrame(() => {
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';
      });
      
      
      

    // Change text inside "No" button
    if (noButton.innerText === 'No') {
      noButton.innerText = 'You sure?'; 
    } else if (noButton.innerText === 'You sure?') {
      noButton.innerText = 'Really sure?';
    } else {
      noButton.innerText = 'Think again!';
    }

    // Increase ONLY the "Yes" button size
    let yesButton = document.getElementById('yes-button');
    let currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
    let newSize = parseFloat(currentFontSize) * 1.5;
    yesButton.style.fontSize = newSize + 'px';
  }
}

// Function to flash rainbow colors for 2 seconds, then stop
function flashRainbowColors(callback) {
  let colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
  let i = 0;
  let startTime = Date.now();

  function flash() {
    if (Date.now() - startTime < 2000) {
      document.body.style.background = colors[i];
      i = (i + 1) % colors.length;
      setTimeout(() => {
        requestAnimationFrame(flash);
      }, 200);
    } else {
      document.body.style.background = "linear-gradient(to bottom, #FDE2E4, #FADADD)";
      if (callback) callback();
    }
  }

  flash();
}

// Function to display the cat-heart.gif
function displayCatHeart() {
  let imageContainer = document.getElementById('image-container');
  
  // Clear previous content to ensure only one GIF exists
  imageContainer.innerHTML = '';
  
  // Create a new Image element for the cat-heart GIF
  let catHeartImage = new Image();
  catHeartImage.src = 'images/cat-heart.gif';
  catHeartImage.alt = 'Cat Heart';
  catHeartImage.id = 'heart-gif';

  imageContainer.appendChild(catHeartImage);

  // Hide the buttons container
  document.getElementById('buttons-container').style.display = 'none';

  // Restart the GIF every 2 seconds
  setInterval(() => {
    let existingGif = document.getElementById('heart-gif');
    if (existingGif) {
      existingGif.src = 'images/cat-heart.gif?' + new Date().getTime();
    }
  }, 2000);

  // Show the "Thank You" message
  document.getElementById('thank-you-message').style.display = 'block';
}

// Function to display the initial cat image ONCE
function displayCat() {
  let imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = '';

  let catImage = new Image();
  catImage.src = 'images/ella.gif';
  catImage.alt = 'Cute Cat';
  catImage.id = 'initial-image'
  catImage.onload = function() {
    imageContainer.appendChild(catImage);
  };
}

// Display the initial cat image on page load
window.onload = function () {
  displayCat();
};

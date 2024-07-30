const CollectionTitle = document.querySelector('#CollectionTitle');
const AboutTitle = document.querySelector('#AboutTitle');
const ContactTitle = document.querySelector('#ContactTitle');
const AboutPage = document.getElementById('AboutPage');
const CollectionPage = document.getElementById('CollectionPage');
const ContactPage = document.getElementById('ContactPage');

const screenWidth = window.innerWidth;
const images = [];
const imageChoice = "Flashy2_NB"
const firstPic = 32;
const lastPic = 90;
const totalImages = lastPic - firstPic;
let isPreloaded = false;


// ------------------------------------------ IMAGE LOADER/APPENDER ----------------------------------------------------

// Preload images
function preloadImages() {
  let loadedImages = 0;
  for (let i = firstPic; i <= lastPic; i++) {
      const paddedIndex = String(i).padStart(5, '0');
      const img = new Image();
      img.src = `/PNGs/fbf/${imageChoice}/Comp 1_${paddedIndex}.png`;

      img.onload = () => {
          loadedImages++;
          if (loadedImages === totalImages) {
              isPreloaded = true;
              console.log("All images preloaded.");
          }
      };
      images.push(img);
  }
}

// Remove images from the array and clear memory
function removeImages() {
  images.forEach(img => {
      img.src = ''; // Clear image source to free up memory
  });
  images.length = 0; // Clear the array
  isPreloaded = false; // Optionally reset preload status
  document.body.style.backgroundImage = ''; // Clear background image
  console.log("Images removed from array.");
}

// -------------------------------------- Background Update Functions ---------------------------------------

function updateBackgroundDesktop(event) {
  if (!isPreloaded) return;

  const mouseX = event.clientX;
  const screenWidth = window.innerWidth; // Get screen width dynamically
  let imageIndex = Math.floor((mouseX / screenWidth) * totalImages) + firstPic;

  // Ensure imageIndex is within bounds
  imageIndex = Math.max(firstPic, Math.min(imageIndex, lastPic));

  const indexInArray = imageIndex - firstPic; // Calculate the index in the `images` array
  const imageElement = images[indexInArray]; // Access the image element directly

  if (imageElement) {
    const imageUrl = imageElement.src; // Get the URL of the image
    // Update the background image
    document.body.style.backgroundImage = `url(${imageUrl})`;
  } else {
    console.error(`Image with index ${indexInArray} not found in the images array.`);
  }
}

// Update background image based on device tilt (mobile)
function updateBackgroundMobile(event) {
  if (!isPreloaded) return;

  const rotation = event.alpha; // rotation around the z-axis
  const tilt = event.gamma; // left-to-right tilt in degrees

  // Calculate image index based on both rotation and tilt
  let imageIndex = Math.floor(((rotation + tilt + 180) / 360) * totalImages) + firstPic;

  // Ensure imageIndex is within bounds
  imageIndex = Math.max(firstPic, Math.min(imageIndex, lastPic));

  const paddedIndex = String(imageIndex).padStart(5, '0');
  document.body.style.backgroundImage = `url('/PNGs/fbf/Comp_1/Comp 1_${paddedIndex}.png')`;
}

// Function to remove images from the array
function removeImages() {
  images.forEach(img => {
    img.src = ''; // Clear image source to free up memory
  });
  images.length = 0; // Clear the array
  isPreloaded = false; // Optionally reset preload status
  document.body.style.backgroundImage = ''; // Clear background image
  console.log("Images removed from array.");
}


//------------------------------------------  Navigation event handlers ----------------------------------------------------

CollectionTitle.addEventListener('click', () => {
  console.log('You clicked the Collection Title');
  AboutPage.style.display = 'none';
  ContactPage.style.display = 'none';
  CollectionPage.style.display = 'flex';
  removeImages(); // Remove images when switching to Collection Page
});

AboutTitle.addEventListener('click', () => {
  console.log('You clicked the About Title');
  ContactPage.style.display = 'none';
  CollectionPage.style.display = 'none';
  AboutPage.style.display = 'flex';
  removeImages(); // Remove images when switching to About Page
});

ContactTitle.addEventListener('click', () => {
  console.log('You clicked the Contact Title');
  AboutPage.style.display = 'none';
  CollectionPage.style.display = 'none';
  ContactPage.style.display = 'flex';
  removeImages(); // Remove images when switching to Contact Page
});


// --------------------------------------- Throttle Function ------------------------------------------------ 

// Throttle function to limit how often a function can be executed
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function(...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

//-----------------     ------------------------- IPHONE ---------------------      --------------------- 


// --------------------------------------- Device Initialization --------------------------------------------

// Check if the device is mobile
function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

}

// Initialize event listeners based on device type
function init() {
  if (isMobileDevice()) {
      ContactPage.style.display = 'none';
      CollectionPage.style.display = 'none';
      AboutPage.style.display = 'flex';
      AboutPage.style.color = 'rgba(255, 200, 118, 0.5)';
      removeImages(); // Remove images when switching to About Page
      console.log("Device detected: mobile");
  } else {
      document.addEventListener('mousemove', throttle(updateBackgroundDesktop, 30));
      console.log("Device detected: computer");
  }
}

// Preload images and initialize event listeners when the page loads
window.onload = () => {
  preloadImages();
  init();
};
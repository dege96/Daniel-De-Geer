const CollectionTitle = document.querySelector('#CollectionTitle');
const AboutTitle = document.querySelector('#AboutTitle');
const ContactTitle = document.querySelector('#ContactTitle');
const AboutPage = document.getElementById('AboutPage');
const CollectionPage = document.getElementById('CollectionPage');
const ContactPage = document.getElementById('ContactPage');

const screenWidth = window.innerWidth;
const images = [];
const firstPic = 32;
const lastPic = 69;
const totalImages = lastPic - firstPic;

let isPreloaded = false;

// ------------------------------------------ image handling ----------------------------------------------------

// Preload images
function preloadImages() {
  let loadedImages = 0;
  for (let i = firstPic; i <= lastPic; i++) {
    const paddedIndex = String(i).padStart(5, '0');
    const img = new Image();
    img.src = `/PNGs/fbf/Comp_1/Comp 1_${paddedIndex}.png`;
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

// Add class to images
function displayImages() {
  const container = document.getElementById('victor-container');
  images.forEach((img, index) => {
      img.classList.add('image');
      img.id = `image${index + 1}`;
      container.appendChild(img);
  });
}

// Update background image based on mouse movement (desktop)
function updateBackgroundDesktop(event) {
  if (!isPreloaded) return;
  
  const mouseX = event.clientX;
  let imageIndex = Math.floor((mouseX / screenWidth) * totalImages) + 32;

  // Ensure imageIndex is within bounds
  imageIndex = Math.max(32, Math.min(imageIndex, 69));

  const paddedIndex = String(imageIndex).padStart(5, '0');
  document.body.style.backgroundImage = `url('/PNGs/fbf/Comp_1/Comp 1_${paddedIndex}.png')`;
}


// Update background image based on device tilt (mobile)
function updateBackgroundMobile(event) {
  if (!isPreloaded) return; // Exit if images are not yet preloaded

  const rotation = event.alpha; // alpha represents the rotation around the z-axis

  // Calculate image index based on both rotation and tilt
  let imageIndex = Math.floor(((rotation + 180) / 360) * totalImages) + 32;

  // Ensure imageIndex is within bounds
  imageIndex = Math.max(32, Math.min(imageIndex, 69));

  // Format the index with leading zeros
  const paddedIndex = String(imageIndex).padStart(5, '0');

  // Set the background image
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
  console.log('You clicked the Collection Title!');
  AboutPage.style.display = 'none';
  ContactPage.style.display = 'none';
  CollectionPage.style.display = 'flex';
  removeImages(); // Remove images when switching to Collection Page
});

AboutTitle.addEventListener('click', () => {
  console.log('You clicked the About Title!');
  ContactPage.style.display = 'none';
  CollectionPage.style.display = 'none';
  AboutPage.style.display = 'flex';
  removeImages(); // Remove images when switching to About Page
});

ContactTitle.addEventListener('click', () => {
  console.log('You clicked the Contact Title!');
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


// ------------------------------------ Device Orientation Permission ----------------------------------------

// Request permission for device orientation on iOS 13+
function requestDeviceOrientationPermission() {
  if (!requestPermissionButton) {
      console.error('requestPermissionButton not found in the DOM.');
      return;
  }

  // Check if iOS 13+ permission request is needed
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      requestPermissionButton.style.display = 'block'; // Show button for iOS 13+
      requestPermissionButton.addEventListener('click', () => {
          DeviceOrientationEvent.requestPermission()
              .then(permissionState => {
                  if (permissionState === 'granted') {
                      window.addEventListener('deviceorientation', throttle(updateBackgroundMobile, 30));
                      requestPermissionButton.style.display = 'none'; // Hide button after permission granted
                  } else {
                      alert('Permission to access device orientation was denied.');
                  }
              })
              .catch(console.error);
      });
  } else {
      // Handle regular non-iOS 13+ devices
      window.addEventListener('deviceorientation', throttle(updateBackgroundMobile, 30));
  }
}

// --------------------------------------- Device Initialization --------------------------------------------

// Check if the device is mobile
function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Initialize event listeners based on device type
function init() {
  if (isMobileDevice()) {
      requestDeviceOrientationPermission();
  } else {
      document.addEventListener('mousemove', throttle(updateBackgroundDesktop, 30));
  }
}

// Preload images and initialize event listeners when the page loads
window.onload = () => {
  preloadImages();
  init();
};

// Register event listeners based on the device type
document.addEventListener('DOMContentLoaded', () => {
  preloadImages();
});
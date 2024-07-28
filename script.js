const CollectionTitle = document.querySelector('#CollectionTitle');
const AboutTitle = document.querySelector('#AboutTitle');
const ContactTitle = document.querySelector('#ContactTitle');
const AboutPage = document.getElementById('AboutPage');
const CollectionPage = document.getElementById('CollectionPage');
const ContactPage = document.getElementById('ContactPage');

const images = [];
const totalImages = 38;
let isPreloaded = false;

// Preload images
function preloadImages() {
  let loadedImages = 0;
  for (let i = 32; i <= 69; i++) {
    const paddedIndex = String(i).padStart(5, '0');
    const img = new Image();
    img.src = `/PNGs/fbf/Comp_1/bounce_word_framebyframe_${paddedIndex}.jpg`;
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

// Call preloadImages when the page loads
window.onload = preloadImages;

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

// Navigation event handlers
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

// Update background image based on mouse movement (desktop)
function updateBackgroundDesktop(event) {
  if (!isPreloaded) return;

  const screenWidth = window.innerWidth;
  const mouseX = event.clientX;
  let imageIndex = Math.floor((mouseX / screenWidth) * totalImages) + 32;

  // Ensure imageIndex is within bounds
  imageIndex = Math.max(32, Math.min(imageIndex, 69));

  const paddedIndex = String(imageIndex).padStart(5, '0');
  document.body.style.backgroundImage = `url('/PNGs/fbf/Comp_1/bounce_word_framebyframe_${paddedIndex}.jpg')`;
}

// Update background image based on device tilt (mobile)
function updateBackgroundMobile(event) {
  if (!isPreloaded) return; // Exit if images are not yet preloaded

  const rotation = event.gamma; // gamma represents the left-to-right tilt in degrees
  let imageIndex = Math.floor(((rotation + 90) / 180) * totalImages) + 32;

  // Ensure imageIndex is within bounds
  imageIndex = Math.max(32, Math.min(imageIndex, 69));

  // Format the index with leading zeros
  const paddedIndex = String(imageIndex).padStart(5, '0');

  // Set the background image
  document.body.style.backgroundImage = `url('/PNGs/fbf/Comp_1/bounce_word_framebyframe_${paddedIndex}.jpg')`;
}

// Initialize event listeners based on device type
function init() {
  if (isMobileDevice()) {
    requestDeviceOrientationPermission();
  } else {
    document.addEventListener('mousemove', throttle(updateBackgroundDesktop, 30));
  }
}

// Request permission for device orientation (iOS specific)
function requestDeviceOrientationPermission() {
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', throttle(updateBackgroundMobile, 30));
          console.log('Device orientation permission granted. Event listener added.');
        } else {
          console.log('Device orientation permission denied.');
        }
      })
      .catch(console.error);
  } else {
    // Non-iOS devices
    window.addEventListener('deviceorientation', throttle(updateBackgroundMobile, 30));
    console.log('Non-iOS device detected. Device orientation event listener added.');
  }
}

// Check if the device is mobile
function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Register event listeners based on the device type
document.addEventListener('DOMContentLoaded', () => {
  preloadImages();
  init();
});

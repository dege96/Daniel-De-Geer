const CollectionTitle = document.querySelector('#CollectionTitle');
const AboutTitle = document.querySelector('#AboutTitle');
const ContactTitle = document.querySelector('#ContactTitle');
const AboutPage = document.getElementById('AboutPage');
const CollectionPage = document.getElementById('CollectionPage');
const ContactPage = document.getElementById('ContactPage');
const GlbWrapper =  document.getElementById('GlbWrapper');

const Bild1 =  document.getElementById('bild1');
const Bild2 =  document.getElementById('bild2');
const Bild3 =  document.getElementById('bild3');
const title = document.querySelector('#title');

const totalImages = 69 - 32 + 1;
const images = [];
let isPreloaded = false;

// Preload images
function preloadImages() {
    let loadedImages = 0;
    for (let i = 32; i <= 69; i++) {
        const paddedIndex = String(i).padStart(5, '0');
        const img = new Image();
        img.src = `/PNGs/fbf/Comp 1/bounce_word_framebyframe_${paddedIndex}.jpg`;
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
    document.body.style.backgroundImage = `url('/PNGs/fbf/Comp 1/bounce_word_framebyframe_${paddedIndex}.jpg')`;
}

// Update background image based on device tilt (mobile)
function updateBackgroundMobile(event) {
    if (!isPreloaded) return;

    const rotation = event.gamma; // gamma represents left-right tilt
    let imageIndex = Math.floor(((rotation + 90) / 180) * totalImages) + 32;

    // Ensure imageIndex is within bounds
    imageIndex = Math.max(32, Math.min(imageIndex, 69));

    const paddedIndex = String(imageIndex).padStart(5, '0');
    document.body.style.backgroundImage = `url('/PNGs/fbf/Comp 1/bounce_word_framebyframe_${paddedIndex}.jpg')`;
}

// Initialize event listeners based on device type
function init() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Use deviceorientation for mobile devices to handle tilting
        window.addEventListener('deviceorientation', throttle(updateBackgroundMobile, 30));
    } else {
        // For desktop, use mouse movement
        document.addEventListener('mousemove', throttle(updateBackgroundDesktop, 30));
    }
}

// Initialize the script
preloadImages();
document.addEventListener('DOMContentLoaded', init);

// Navigation event handlers
document.querySelector('#CollectionTitle').addEventListener('click', () => {
    console.log('You clicked the Collection Title!');
    document.getElementById('AboutPage').style.display = 'none';
    document.getElementById('ContactPage').style.display = 'none';
    document.getElementById('CollectionPage').style.display = 'flex';
    document.getElementById('GlbWrapper').style.display = "none";
});

document.querySelector('#AboutTitle').addEventListener('click', () => {
    console.log('You clicked the About Title!');
    document.getElementById('ContactPage').style.display = 'none';
    document.getElementById('CollectionPage').style.display = 'none';
    document.getElementById('AboutPage').style.display = 'flex';
    document.getElementById('GlbWrapper').style.display = "none";
});

document.querySelector('#ContactTitle').addEventListener('click', () => {
    console.log('You clicked the Contact Title!');
    document.getElementById('AboutPage').style.display = 'none';
    document.getElementById('CollectionPage').style.display = 'none';
    document.getElementById('ContactPage').style.display = 'flex';
    document.getElementById('GlbWrapper').style.display = "none";
});








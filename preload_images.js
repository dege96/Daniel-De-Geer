const totalImages = 38; // Number of images you expect to preload
let loadedImages = 0;
const images = [];
let isPreloaded = false;

function preloadImages() {
    for (let i = 32; i <= 69; i++) {
        const paddedIndex = String(i).padStart(5, '0');
        const img = new Image();
        img.src = `/PNGs/fbf/Comp_1/bounce_word_framebyframe_${paddedIndex}.jpg`;
        img.onload = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
                isPreloaded = true;
                console.log("All images preloaded.");
                createImageContainers(); // Create containers after images are preloaded
            }
        };
        images.push(img);
    }
}

function createImageContainers() {
    const container = document.getElementById('image-container');
    images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.className = 'preloaded-image';
        container.appendChild(imgElement);
    });
}

// Start preloading images
preloadImages();

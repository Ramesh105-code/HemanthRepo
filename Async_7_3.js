// script.js
const images = [
    "https://via.placeholder.com/600x400?text=Movie+1",
    "https://via.placeholder.com/600x400?text=Movie+2",
    "https://via.placeholder.com/600x400?text=Movie+3",
    "https://via.placeholder.com/600x400?text=Movie+4",
    "https://via.placeholder.com/600x400?text=Movie+5"
];

let currentImageIndex = 0;
const slideshowElement = document.getElementById('slideshow');

// Function to update the slideshow image
function updateSlideshow() {
    slideshowElement.src = images[currentImageIndex];
    currentImageIndex = (currentImageIndex + 1) % images.length; // Loop back to the first image after the last one
}

// Initialize slideshow with the first image
slideshowElement.src = images[0];
setInterval(updateSlideshow, 2000); // Change image every 2 seconds
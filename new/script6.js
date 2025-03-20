// Function to handle popups
function handlePopup(previewId, popupId, closeClass) {
    const servicePreview = document.getElementById(previewId);
    const popupOverlay = document.getElementById(popupId);
    const closeButton = popupOverlay.querySelector(closeClass);
    
    servicePreview.addEventListener('click', () => {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeButton.addEventListener('click', () => {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Your existing code for YouTube popup
    const youtubeButton = document.getElementById('youtube-button');
    const videoPopup = document.getElementById('video-popup');
    const popupClose = document.getElementById('popup-close');
    const youtubeIframe = document.getElementById('youtube-iframe');
    const videoId = 'z8IGZBukSxo'; // Replace with your YouTube video ID
    
    // Open popup when button is clicked
    youtubeButton.addEventListener('click', function() {
        // Set the YouTube embed URL with parameters to remove white space and add autoplay
        youtubeIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white&iv_load_policy=3`;
        videoPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while popup is open
    });
    
    // Close popup when close button is clicked
    popupClose.addEventListener('click', function() {
        closePopup();
    });
    
    // Close popup when clicking outside the video
    videoPopup.addEventListener('click', function(e) {
        if (e.target === videoPopup) {
            closePopup();
        }
    });
    
    // Close popup when ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoPopup.classList.contains('active')) {
            closePopup();
        }
    });
    
    function closePopup() {
        videoPopup.classList.remove('active');
        youtubeIframe.src = ''; // Stop the video
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // NEW CODE: Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
});

// Apply to multiple elements
handlePopup('vehicle-branding-preview', 'vehicle-branding-popup', '.close-popup');
handlePopup('floor-sticker-branding-preview', 'floor-sticker-branding-popup', '.close-popup');
handlePopup('wall-sticker-branding-preview', 'wall-sticker-branding-popup', '.close-popup');
handlePopup('exhibition-stands-preview', 'exhibition-stands-popup', '.close-popup');
handlePopup('pop-up-&-roll-up-stands-preview', 'pop-up-&-roll-up-stands-popup', '.close-popup');
handlePopup('signage-solutions-preview', 'signage-solutions-popup', '.close-popup');
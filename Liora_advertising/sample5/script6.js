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

// Apply to multiple elements
handlePopup('vehicle-branding-preview', 'vehicle-branding-popup', '.close-popup');
handlePopup('floor-sticker-branding-preview', 'floor-sticker-branding-popup', '.close-popup');
handlePopup('wall-sticker-branding-preview', 'wall-sticker-branding-popup', '.close-popup');
handlePopup('exhibition-stands-preview', 'exhibition-stands-popup', '.close-popup');
handlePopup('pop-up-&-roll-up-stands-preview', 'pop-up-&-roll-up-stands-popup', '.close-popup');
handlePopup('signage-solutions-preview', 'signage-solutions-popup', '.close-popup');

### Step 1: HTML Structure for the Popup

Add the following HTML snippet to your existing HTML file, ideally at the end of the `<body>` section:

```html
<!-- Image Popup Overlay -->
<div class="image-popup-overlay" id="image-popup">
    <div class="image-popup-content">
        <button class="close-popup" id="close-image-popup">&times;</button>
        <div class="image-gallery">
            <img src="img/Vehicle_branding.jpg" alt="Vehicle Branding" class="popup-image">
            <img src="img/Floor_Sticker_Branding.jpg" alt="Floor Sticker Branding" class="popup-image">
            <img src="img/Wall_Sticker_Branding.jpg" alt="Wall Sticker Branding" class="popup-image">
            <img src="img/Exhibition_Stands.jpg" alt="Exhibition Stands" class="popup-image">
            <img src="img/pop_up.jpg" alt="Pop Up & Roll Up Stands" class="popup-image">
            <img src="img/Signage_Solutions.jpg" alt="Signage Solutions" class="popup-image">
        </div>
    </div>
</div>
```

### Step 2: CSS Styles for the Popup

Add the following CSS to your `style.css` file to style the popup for mobile devices:

```css
/* Image Popup Overlay */
.image-popup-overlay {
    display: none; /* Hidden by default */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
    z-index: 1000; /* On top of other elements */
    justify-content: center;
    align-items: center;
}

/* Popup Content */
.image-popup-content {
    position: relative;
    max-width: 90%; /* Responsive width */
    max-height: 90%; /* Responsive height */
    overflow: auto; /* Scroll if needed */
    background-color: white; /* White background for the popup */
    border-radius: 10px; /* Rounded corners */
    padding: 20px; /* Padding around the content */
}

/* Close Button */
.close-popup {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    background: none;
    border: none;
    color: #000; /* Close button color */
    cursor: pointer;
}

/* Image Gallery */
.image-gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px; /* Space between images */
}

/* Popup Images */
.popup-image {
    max-width: 100%; /* Responsive image width */
    height: auto; /* Maintain aspect ratio */
    border-radius: 5px; /* Rounded corners for images */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Shadow effect */
}

/* Media Query for Mobile Devices */
@media (max-width: 768px) {
    .image-popup-content {
        max-width: 95%; /* Slightly larger on mobile */
        max-height: 95%; /* Slightly larger on mobile */
    }
}
```

### Step 3: JavaScript to Open/Close the Popup

You will need to add some JavaScript to handle the opening and closing of the popup. Add the following script to your `script.js` file:

```javascript
// Open the image popup
function openImagePopup() {
    document.getElementById('image-popup').style.display = 'flex';
}

// Close the image popup
document.getElementById('close-image-popup').addEventListener('click', function() {
    document.getElementById('image-popup').style.display = 'none';
});

// Example: Call openImagePopup() when a specific button is clicked
// document.getElementById('your-button-id').addEventListener('click', openImagePopup);
```

### Summary

This implementation creates a mobile-specific popup that displays images of the main services. The popup is styled to be responsive and visually appealing, with a semi-transparent background and a close button. You can trigger the popup by calling the `openImagePopup()` function from any button or link on your website.
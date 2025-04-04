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

    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });
});

// Toggle chat options visibility
const chatIcon = document.getElementById('chat-icon');
const chatOptions = document.getElementById('chat-options');

chatIcon.addEventListener('click', () => {
    if (chatOptions.style.display === 'flex') {
        chatOptions.style.display = 'none';
    } else {
        chatOptions.style.display = 'flex';
    }
});

// Add this to your existing JavaScript

document.addEventListener("DOMContentLoaded", function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to animate service cards when they come into view
    function animateServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('animate');
            }
        });
    }
    
    // Initial check for elements in viewport
    animateServiceCards();
    
    // Check when user scrolls
    window.addEventListener('scroll', animateServiceCards);
});

// Add to your existing script10.js
// Other Services popup functionality
document.addEventListener("DOMContentLoaded", function() {
    // Get all service items in the "Other Services" section
    const otherServiceItems = document.querySelectorAll('.other-services .service-item');
    
    // Other services data
    const otherServicesData = {
        "Roll up stand": {
            description: "Portable, retractable banner stands perfect for exhibitions, events and retail environments. Our high-quality roll-up stands offer excellent visibility with easy setup and transport.",
            image: "img/popup-stand-3.jpg"
        },
        "Flex or banner printing": {
            description: "High-resolution large format printing on durable flex material. Ideal for outdoor advertising, events, and promotional displays with weather-resistant, vibrant results.",
            image: "img/other-services/flex-or-banner.jpg"
        },
        "Foamboard": {
            description: "Lightweight yet rigid presentation boards perfect for indoor displays, exhibitions, and point-of-sale advertising with excellent print quality and professional finish.",
            image: "img/other-services/foam-board.jpg"
        },
        "Acrylic holder": {
            description: "Elegant, transparent display solutions for brochures, menus, and promotional materials. Our acrylic holders combine functionality with modern aesthetics.",
            image: "img/other-services/acrylic-holder.jpg"
        },
        "Light frames": {
            description: "Illuminated display frames that add dimension and visibility to your messaging. Our LED light frames create striking visual impact for retail and exhibition environments.",
            image: "img/other-services/light-frames.jpg"
        },
        "External 3D signs": {
            description: "Eye-catching dimensional signage that makes your business stand out. Our external 3D signs offer durability, visibility and brand reinforcement.",
            image: "img/other-services/3d-signs.jpg"
        },
        "Internal signs": {
            description: "Professional indoor signage solutions for navigation, branding, and information. Our internal signs enhance your space while reinforcing your brand identity.",
            image: "img/other-services/internal-signs.jpg"
        },
        "Way Finding sign": {
            description: "Strategic directional signage systems that help visitors navigate your space efficiently. Our wayfinding solutions combine functionality with brand-consistent design.",
            image: "img/other-services/wayfinding.jpg"
        },
        "Product display stands": {
            description: "Custom-designed stands to showcase your products effectively. Our display solutions optimize visibility and customer engagement in retail environments.",
            image: "img/other-services/product-display.jpg"
        },
        "Digital display banner": {
            description: "Dynamic digital signage solutions for modern, updatable messaging. Our digital display banners offer versatility and high-impact visual communication.",
            image: "img/other-services/digital-banner.jpg"
        },
        "Posters": {
            description: "High-quality printed posters for advertising, promotions and events. Our poster printing service delivers sharp imagery and vibrant colors for maximum impact.",
            image: "img/other-services/posters.jpg"
        },
        "Flex face sign": {
            description: "Durable, illuminated signage with replaceable flex face material. Our flex face signs offer excellent visibility day and night for storefronts and business identification.",
            image: "img/other-services/flex-face.jpg"
        }
    };
    
    // Create popup overlay if it doesn't exist
    let otherServicePopup = document.getElementById('other-service-popup');
    if (!otherServicePopup) {
        otherServicePopup = document.createElement('div');
        otherServicePopup.id = 'other-service-popup';
        otherServicePopup.className = 'popup-overlay';
        document.body.appendChild(otherServicePopup);
        
        // Create popup content
        otherServicePopup.innerHTML = `
            <div class="other-service-popup-content">
                <button class="close-popup">&times;</button>
                <div class="popup-service-image">
                    <img id="popup-service-img" src="" alt="Service Image">
                </div>
                <div class="popup-service-details">
                    <h3 id="popup-service-title"></h3>
                    <p id="popup-service-description"></p>
                </div>
            </div>
        `;
        
        // Close popup functionality
        otherServicePopup.querySelector('.close-popup').addEventListener('click', function() {
            otherServicePopup.classList.remove('active');
        });
    }
    
    // Add click event to each service item
    otherServiceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceName = item.querySelector('h3').textContent;
            const serviceData = otherServicesData[serviceName] || {
                description: "Details about this service will be available soon.",
                image: "img/placeholder.jpg"
            };
            
            // Fill the popup with data
            document.getElementById('popup-service-img').src = serviceData.image;
            document.getElementById('popup-service-img').alt = serviceName;
            document.getElementById('popup-service-title').textContent = serviceName;
            document.getElementById('popup-service-description').textContent = serviceData.description;
            
            // Show popup
            otherServicePopup.classList.add('active');
        });
    });
});
// end of other services popup


// Apply to multiple elements
handlePopup('vehicle-branding-preview', 'vehicle-branding-popup', '.close-popup');
handlePopup('floor-sticker-branding-preview', 'floor-sticker-branding-popup', '.close-popup');
handlePopup('wall-sticker-branding-preview', 'wall-sticker-branding-popup', '.close-popup');
handlePopup('exhibition-stands-preview', 'exhibition-stands-popup', '.close-popup');
handlePopup('pop-up-&-roll-up-stands-preview', 'pop-up-&-roll-up-stands-popup', '.close-popup');
handlePopup('signage-solutions-preview', 'signage-solutions-popup', '.close-popup');
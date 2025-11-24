/**
 * Tridev Travel Agency - main.js
 * Handles smooth scrolling, WhatsApp routing, and Testimonial slider.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Constants & Numbers --- */
    const WHATSAPP_NUMBERS = {
        'Travel Package': '919634347223',
        'Char Dham Yatra': '919634347223',
        'Temple Tour': '919634347223',
        'Taxi Booking': '918800778189',
        'Support': '919634435040'
    };
    const SUPPORT_NUMBER = WHATSAPP_NUMBERS['Support'];

    /* --- Utility Functions --- */

    /**
     * Encodes the WhatsApp URL for click-to-chat.
     * @param {string} service - The type of service being enquired about.
     * @param {string} destination - The specific destination or vehicle type.
     * @returns {string} The complete WhatsApp click-to-chat URL.
     */
    const generateWhatsAppURL = (service, destination) => {
        let number = WHATSAPP_NUMBERS[service] || SUPPORT_NUMBER;
        let prefill;

        if (service === 'Taxi Booking') {
            prefill = `Hello Tridev Team, I'd like to book a ${destination}. Please share the current availability and rates.`;
        } else if (service === 'Support') {
            prefill = `Hello Tridev Team, I have a general enquiry.`;
        } else {
            // Default for Travel Packages, Char Dham, Temple Tour
            prefill = `Hello Tridev Team, I'm interested in a "${service}" for ${destination}. Could you share package details?`;
        }

        // Use encodeURIComponent for prefilled text
        return `https://wa.me/${number}?text=${encodeURIComponent(prefill)}`;
    };

    /* --- 1. WhatsApp & Enquiry Logic --- */
    
    // Add click listener to all Enquiry CTAs
    document.querySelectorAll('.enquiry-cta').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.currentTarget.closest('[data-service]');
            const service = card.getAttribute('data-service');
            const destination = card.getAttribute('data-destination');
            
            if (service && destination) {
                window.open(generateWhatsAppURL(service, destination), '_blank');
            } else {
                // Fallback for general quick enquiry
                window.open(generateWhatsAppURL('Support', 'General Enquiry'), '_blank');
            }
        });
    });

    // Add click listener to general floating/mobile WhatsApp buttons
    document.querySelectorAll('.float-whatsapp, .bar-whatsapp').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(generateWhatsAppURL('Support', 'General Enquiry'), '_blank');
        });
    });

    // Add click listener to Quick Enquiry buttons
    document.querySelectorAll('.quick-enquiry-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // A simple alert or a modal could be used here. For production-ready, this should open a modal form.
            // For now, it routes to a general WhatsApp support number.
            window.open(generateWhatsAppURL('Support', 'General Enquiry'), '_blank');
        });
    });

    /* --- 2. Smooth Scrolling --- */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Allow WhatsApp/Call anchors to function normally
            if (this.getAttribute('href') === '#') return; 

            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    /* --- 3. Testimonial Slider --- */

    const sliderContainer = document.querySelector('.testimonial-slider-container');
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const totalSlides = slides.length;

    if (slider && totalSlides > 0) {
        
        // Initial setup
        slides[0].classList.add('active');

        const updateSlider = () => {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            // Show the current slide
            slides[currentIndex].classList.add('active');
            
            // Note: Since we use opacity/display for a simple fade, we don't need to change the 'transform' property
            // If using horizontal slide:
            // slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const goToNext = () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        };

        const goToPrev = () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        };

        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);

        // Optional: Auto-slide every 5 seconds
        // setInterval(goToNext, 5000);
    }
});
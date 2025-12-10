/**
 * Main JavaScript File
 * Client-side functionality for Movie Management System
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('🎬 Movie Management System Loaded');

    // Initialize all features
    initializeImagePreview();
    initializeCharacterCounter();
    initializeFormValidation();
    initializeAnimations();
    initializeDeleteConfirmation();
});

/**
 * Image Preview for File Upload
 */
function initializeImagePreview() {
    const posterInput = document.getElementById('poster');
    if (!posterInput) return;

    const imagePreview = document.getElementById('imagePreview');
    const fileText = document.querySelector('.file-text');

    posterInput.addEventListener('change', function (e) {
        const file = e.target.files[0];

        if (file) {
            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                posterInput.value = '';
                return;
            }

            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert('Please select a valid image file (JPG, PNG, GIF, WebP)');
                posterInput.value = '';
                return;
            }

            // Update file name display
            if (fileText) {
                fileText.textContent = file.name;
            }

            // Show preview
            const reader = new FileReader();
            reader.onload = function (e) {
                if (imagePreview) {
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                    imagePreview.style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

/**
 * Character Counter for Description Textarea
 */
function initializeCharacterCounter() {
    const descriptionField = document.getElementById('description');
    if (!descriptionField) return;

    const charCount = document.querySelector('.char-count');
    if (!charCount) return;

    // Update counter on input
    descriptionField.addEventListener('input', function () {
        const currentLength = this.value.length;
        const maxLength = this.getAttribute('maxlength') || 1000;
        charCount.textContent = `${currentLength} / ${maxLength}`;

        // Change color when approaching limit
        if (currentLength > maxLength * 0.9) {
            charCount.style.color = 'var(--warning)';
        } else {
            charCount.style.color = 'var(--text-muted)';
        }
    });

    // Initialize counter
    const event = new Event('input');
    descriptionField.dispatchEvent(event);
}

/**
 * Form Validation
 */
function initializeFormValidation() {
    const movieForm = document.querySelector('.movie-form');
    if (!movieForm) return;

    movieForm.addEventListener('submit', function (e) {
        const title = document.getElementById('title');
        const year = document.getElementById('year');
        const description = document.getElementById('description');
        const genre = document.getElementById('genre');

        let isValid = true;
        let errorMessage = '';

        // Validate title
        if (title && title.value.trim().length < 1) {
            isValid = false;
            errorMessage += 'Title is required.\n';
        }

        // Validate year
        if (year) {
            const yearValue = parseInt(year.value);
            const currentYear = new Date().getFullYear();
            if (yearValue < 1888 || yearValue > currentYear + 5) {
                isValid = false;
                errorMessage += `Year must be between 1888 and ${currentYear + 5}.\n`;
            }
        }

        // Validate description
        if (description && description.value.trim().length < 10) {
            isValid = false;
            errorMessage += 'Description must be at least 10 characters.\n';
        }

        // Validate genre
        if (genre && !genre.value) {
            isValid = false;
            errorMessage += 'Please select a genre.\n';
        }

        if (!isValid) {
            e.preventDefault();
            alert(errorMessage);
        }
    });
}

/**
 * Scroll Animations
 */
function initializeAnimations() {
    // Fade in movie cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all movie cards
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

/**
 * Delete Confirmation
 */
function initializeDeleteConfirmation() {
    const deleteForms = document.querySelectorAll('.delete-form');

    deleteForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const confirmed = confirm('Are you sure you want to delete this movie? This action cannot be undone.');
            if (!confirmed) {
                e.preventDefault();
            }
        });
    });
}

/**
 * Smooth Scroll to Top
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--bg-secondary);
        border-left: 4px solid var(--primary);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for use in other scripts
window.MovieApp = {
    scrollToTop,
    showNotification
};

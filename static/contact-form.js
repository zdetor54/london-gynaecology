// Function to initialize contact form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) {
        // Try again after a short delay if form not found
        setTimeout(initContactForm, 100);
        return;
    }
    
    // Set the redirect URL to current page with success parameter
    const nextInput = document.getElementById('form-next');
    if (nextInput) {
        nextInput.value = window.location.origin + window.location.pathname + '?success=true';
    }
    
    // Update subject line with name and email before submission
    form.addEventListener('submit', function(e) {
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const subjectInput = document.getElementById('form-subject');
        if (subjectInput) {
            subjectInput.value = `Contact from ${name} (${email})`;
        }
    });
    
    // Check if redirected from FormSubmit success
    const urlParams = new URLSearchParams(window.location.search);
    const successMessage = document.getElementById('form-success-message');
    
    if (urlParams.get('success') === 'true' && successMessage) {
        successMessage.style.display = 'block';
        // Reset form
        form.reset();
        // Scroll to the success message
        setTimeout(() => {
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        // Hide message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}

// Also try after delays to ensure the contact form has been loaded via fetch
setTimeout(initContactForm, 200);
setTimeout(initContactForm, 500);

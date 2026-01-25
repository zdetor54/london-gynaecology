// Function to initialize contact form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) {
        // Try again after a short delay if form not found
        setTimeout(initContactForm, 100);
        return;
    }
    
    // Prevent duplicate event listeners
    if (form.dataset.initialized) return;
    form.dataset.initialized = 'true';
    
    // Handle form submission via AJAX
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const successMessage = document.getElementById('form-success-message');
        const errorMessage = document.getElementById('form-error-message');
        const originalBtnText = submitBtn.innerHTML;
        
        // Hide any existing messages
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';
        
        // Update button to show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        
        // Update subject with name and email
        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const subjectInput = form.querySelector('input[name="_subject"]');
        if (subjectInput) {
            subjectInput.value = `Appointment request from ${name} (${email})`;
        }
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Auto-hide after 8 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 8000);
                }
                // Reset the form
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            // Show error message
            if (errorMessage) {
                errorMessage.style.display = 'block';
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Auto-hide after 8 seconds
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 8000);
            }
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
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

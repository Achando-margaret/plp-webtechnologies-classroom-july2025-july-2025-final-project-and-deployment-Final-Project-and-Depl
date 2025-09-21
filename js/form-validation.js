// js/form-validation.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    
    if (contactForm) {
        // Initially hide success message
        successMessage.style.display = 'none';
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error messages
            clearErrorMessages();
            
            // Validate form fields
            const isValid = validateForm();
            
            if (isValid) {
                // Form is valid, simulate submission
                simulateFormSubmission();
            }
        });
        
        // Add input event listeners for real-time validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        nameInput.addEventListener('blur', function() {
            validateName();
        });
        
        emailInput.addEventListener('blur', function() {
            validateEmail();
        });
        
        subjectInput.addEventListener('blur', function() {
            validateSubject();
        });
        
        messageInput.addEventListener('blur', function() {
            validateMessage();
        });
    }
    
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
    }
    
    function validateName() {
        const nameInput = document.getElementById('name');
        const errorElement = document.getElementById('name-error');
        const nameValue = nameInput.value.trim();
        
        if (nameValue === '') {
            showError(errorElement, 'Name is required');
            return false;
        }
        
        if (nameValue.length < 2) {
            showError(errorElement, 'Name must be at least 2 characters');
            return false;
        }
        
        hideError(errorElement);
        return true;
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const errorElement = document.getElementById('email-error');
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(errorElement, 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(emailValue)) {
            showError(errorElement, 'Please enter a valid email address');
            return false;
        }
        
        hideError(errorElement);
        return true;
    }
    
    function validateSubject() {
        const subjectInput = document.getElementById('subject');
        const errorElement = document.getElementById('subject-error');
        const subjectValue = subjectInput.value.trim();
        
        if (subjectValue === '') {
            showError(errorElement, 'Subject is required');
            return false;
        }
        
        if (subjectValue.length < 5) {
            showError(errorElement, 'Subject must be at least 5 characters');
            return false;
        }
        
        hideError(errorElement);
        return true;
    }
    
    function validateMessage() {
        const messageInput = document.getElementById('message');
        const errorElement = document.getElementById('message-error');
        const messageValue = messageInput.value.trim();
        
        if (messageValue === '') {
            showError(errorElement, 'Message is required');
            return false;
        }
        
        if (messageValue.length < 10) {
            showError(errorElement, 'Message must be at least 10 characters');
            return false;
        }
        
        hideError(errorElement);
        return true;
    }
    
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function hideError(errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    function clearErrorMessages() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            hideError(element);
        });
    }
    
    function simulateFormSubmission() {
        const contactForm = document.getElementById('contact-form');
        const successMessage = document.getElementById('form-success');
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
});
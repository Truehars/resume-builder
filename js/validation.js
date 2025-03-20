/**
 * Resume Builder - Validation Module
 * Handles form validation
 */

/**
 * Initialize the validation module
 */
export function initValidation() {
    console.log('Initializing validation module');
    
    // Set up form validation
    setupFormValidation();
}

/**
 * Set up form validation
 */
function setupFormValidation() {
    // Personal info form validation
    const personalForm = document.getElementById('personal-info-form');
    if (personalForm) {
        personalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validatePersonalForm()) {
                // Form is valid, proceed to next step
                document.querySelector('[data-next="education"]').click();
            }
        });
        
        // Add input validation on blur
        const requiredInputs = personalForm.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });
        });
        
        // Email validation
        const emailInput = personalForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                validateEmail(emailInput);
            });
        }
        
        // URL validation
        const urlInputs = personalForm.querySelectorAll('input[type="url"]');
        urlInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateUrl(input);
            });
        });
    }
    
    // Education form validation
    const educationForm = document.getElementById('education-info-form');
    if (educationForm) {
        educationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateEducationForm()) {
                // Form is valid, add education or proceed
                document.getElementById('add-education').click();
            }
        });
        
        // Add input validation on blur
        const requiredInputs = educationForm.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });
        });
        
        // Date validation
        const startDateInput = educationForm.querySelector('#eduStartDate');
        const endDateInput = educationForm.querySelector('#eduEndDate');
        const currentCheckbox = educationForm.querySelector('#eduCurrent');
        
        if (startDateInput && endDateInput) {
            endDateInput.addEventListener('change', () => {
                validateDateRange(startDateInput, endDateInput, currentCheckbox);
            });
            
            startDateInput.addEventListener('change', () => {
                if (endDateInput.value) {
                    validateDateRange(startDateInput, endDateInput, currentCheckbox);
                }
            });
        }
    }
    
    // Experience form validation
    const experienceForm = document.getElementById('experience-info-form');
    if (experienceForm) {
        experienceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateExperienceForm()) {
                // Form is valid, add experience or proceed
                document.getElementById('add-experience').click();
            }
        });
        
        // Add input validation on blur
        const requiredInputs = experienceForm.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });
        });
        
        // Date validation
        const startDateInput = experienceForm.querySelector('#expStartDate');
        const endDateInput = experienceForm.querySelector('#expEndDate');
        const currentCheckbox = experienceForm.querySelector('#expCurrent');
        
        if (startDateInput && endDateInput) {
            endDateInput.addEventListener('change', () => {
                validateDateRange(startDateInput, endDateInput, currentCheckbox);
            });
            
            startDateInput.addEventListener('change', () => {
                if (endDateInput.value) {
                    validateDateRange(startDateInput, endDateInput, currentCheckbox);
                }
            });
        }
    }
    
    // Skills form validation
    const skillsForm = document.getElementById('skills-info-form');
    if (skillsForm) {
        skillsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateSkillsForm()) {
                // Form is valid, add skill or proceed
                document.getElementById('add-skill').click();
            }
        });
        
        // Add input validation on blur
        const requiredInputs = skillsForm.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });
        });
    }
}

/**
 * Validate the personal information form
 * @returns {boolean} Whether the form is valid
 */
function validatePersonalForm() {
    const form = document.getElementById('personal-info-form');
    let isValid = true;
    
    // Validate required fields
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    // Validate email
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value && !validateEmail(emailInput)) {
        isValid = false;
    }
    
    // Validate URLs
    const urlInputs = form.querySelectorAll('input[type="url"]');
    urlInputs.forEach(input => {
        if (input.value && !validateUrl(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate the education form
 * @returns {boolean} Whether the form is valid
 */
function validateEducationForm() {
    const form = document.getElementById('education-info-form');
    let isValid = true;
    
    // Validate required fields
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    // Validate date range
    const startDateInput = form.querySelector('#eduStartDate');
    const endDateInput = form.querySelector('#eduEndDate');
    const currentCheckbox = form.querySelector('#eduCurrent');
    
    if (startDateInput && endDateInput && startDateInput.value && endDateInput.value) {
        if (!validateDateRange(startDateInput, endDateInput, currentCheckbox)) {
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Validate the experience form
 * @returns {boolean} Whether the form is valid
 */
function validateExperienceForm() {
    const form = document.getElementById('experience-info-form');
    let isValid = true;
    
    // Validate required fields
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    // Validate date range
    const startDateInput = form.querySelector('#expStartDate');
    const endDateInput = form.querySelector('#expEndDate');
    const currentCheckbox = form.querySelector('#expCurrent');
    
    if (startDateInput && endDateInput && startDateInput.value && endDateInput.value) {
        if (!validateDateRange(startDateInput, endDateInput, currentCheckbox)) {
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Validate the skills form
 * @returns {boolean} Whether the form is valid
 */
function validateSkillsForm() {
    const form = document.getElementById('skills-info-form');
    let isValid = true;
    
    // Validate required fields
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate a required input field
 * @param {HTMLElement} input - Input element to validate
 * @returns {boolean} Whether the input is valid
 */
function validateInput(input) {
    const value = input.value.trim();
    const isValid = value !== '';
    
    if (!isValid) {
        setInputError(input, 'This field is required');
    } else {
        clearInputError(input);
    }
    
    return isValid;
}

/**
 * Validate an email input
 * @param {HTMLElement} input - Email input to validate
 * @returns {boolean} Whether the email is valid
 */
function validateEmail(input) {
    const value = input.value.trim();
    
    // Skip validation if empty and not required
    if (value === '' && !input.hasAttribute('required')) {
        clearInputError(input);
        return true;
    }
    
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    
    if (!isValid) {
        setInputError(input, 'Please enter a valid email address');
    } else {
        clearInputError(input);
    }
    
    return isValid;
}

/**
 * Validate a URL input
 * @param {HTMLElement} input - URL input to validate
 * @returns {boolean} Whether the URL is valid
 */
function validateUrl(input) {
    const value = input.value.trim();
    
    // Skip validation if empty and not required
    if (value === '' && !input.hasAttribute('required')) {
        clearInputError(input);
        return true;
    }
    
    // Check if URL has protocol, add https:// if missing
    if (value && !value.match(/^https?:\/\//)) {
        input.value = 'https://' + value;
    }
    
    try {
        new URL(input.value);
        clearInputError(input);
        return true;
    } catch (e) {
        setInputError(input, 'Please enter a valid URL');
        return false;
    }
}

/**
 * Validate a date range
 * @param {HTMLElement} startInput - Start date input
 * @param {HTMLElement} endInput - End date input
 * @param {HTMLElement} currentCheckbox - "Current" checkbox
 * @returns {boolean} Whether the date range is valid
 */
function validateDateRange(startInput, endInput, currentCheckbox) {
    // Skip validation if "current" is checked
    if (currentCheckbox && currentCheckbox.checked) {
        clearInputError(endInput);
        return true;
    }
    
    // Skip validation if either input is empty
    if (!startInput.value || !endInput.value) {
        clearInputError(startInput);
        clearInputError(endInput);
        return true;
    }
    
    const startDate = new Date(startInput.value);
    const endDate = new Date(endInput.value);
    
    const isValid = startDate <= endDate;
    
    if (!isValid) {
        setInputError(endInput, 'End date must be after start date');
    } else {
        clearInputError(endInput);
    }
    
    return isValid;
}

/**
 * Set an error message on an input
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
function setInputError(input, message) {
    // Remove any existing error
    clearInputError(input);
    
    // Add error class to input
    input.classList.add('input-error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Insert error message after input
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

/**
 * Clear error message from an input
 * @param {HTMLElement} input - Input element
 */
function clearInputError(input) {
    // Remove error class
    input.classList.remove('input-error');
    
    // Remove error message if it exists
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Validate a form element
 * @param {HTMLElement} form - Form element to validate
 * @returns {boolean} Whether the form is valid
 */
export function validateForm(form) {
    switch (form.id) {
        case 'personal-info-form':
            return validatePersonalForm();
        case 'education-info-form':
            return validateEducationForm();
        case 'experience-info-form':
            return validateExperienceForm();
        case 'skills-info-form':
            return validateSkillsForm();
        default:
            return true;
    }
} 
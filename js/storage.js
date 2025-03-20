/**
 * Resume Builder - Storage Module
 * Handles saving and loading data from localStorage
 */

// Storage key for the resume data
const STORAGE_KEY = 'resumeBuilderData';

// Default resume data structure
const defaultResumeData = {
    personal: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        website: '',
        linkedin: ''
    },
    education: [],
    experience: [],
    skills: [],
    settings: {
        template: 'classic',
        color: 'blue',
        fontSize: 100
    }
};

// Current resume data
let resumeData = { ...defaultResumeData };

/**
 * Initialize the storage module
 */
export function initStorage() {
    console.log('Initializing storage module');
    
    // Set up auto-save for form inputs
    setupAutoSave();
}

/**
 * Set up auto-save functionality for all form inputs
 */
function setupAutoSave() {
    // Personal info form
    const personalForm = document.getElementById('personal-info-form');
    if (personalForm) {
        personalForm.addEventListener('input', debounce((e) => {
            if (e.target.name) {
                resumeData.personal[e.target.name] = e.target.value;
                saveToStorage();
            }
        }, 500));
    }
    
    // Listen for custom events from other modules
    document.addEventListener('resumeDataChanged', (e) => {
        if (e.detail && e.detail.section && e.detail.data) {
            resumeData[e.detail.section] = e.detail.data;
            saveToStorage();
        }
    });
    
    // Listen for settings changes
    document.addEventListener('settingsChanged', (e) => {
        if (e.detail) {
            resumeData.settings = { ...resumeData.settings, ...e.detail };
            saveToStorage();
        }
    });
}

/**
 * Save the current resume data to localStorage
 */
export function saveToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
        console.log('Data saved to localStorage');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        // Notify user about storage error
        showStorageError();
    }
}

/**
 * Load resume data from localStorage
 */
export function loadFromStorage() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            resumeData = JSON.parse(savedData);
            console.log('Data loaded from localStorage');
            
            // Fill forms with loaded data
            fillFormsWithData();
            
            // Dispatch event to notify other modules
            document.dispatchEvent(new CustomEvent('resumeDataLoaded', { 
                detail: resumeData 
            }));
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
}

/**
 * Fill all form fields with data from localStorage
 */
function fillFormsWithData() {
    // Fill personal info form
    const personal = resumeData.personal;
    for (const key in personal) {
        const input = document.getElementById(key);
        if (input) {
            input.value = personal[key];
        }
    }
    
    // Apply settings
    const settings = resumeData.settings;
    
    // Apply template
    const templateOptions = document.querySelectorAll('.template-option');
    templateOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.template === settings.template) {
            option.classList.add('active');
        }
    });
    
    // Apply color
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.color === settings.color) {
            option.classList.add('active');
        }
    });
    
    // Apply font size
    const fontSizeInput = document.getElementById('fontSize');
    if (fontSizeInput) {
        fontSizeInput.value = settings.fontSize;
        document.getElementById('fontSizeValue').textContent = `${settings.fontSize}%`;
    }
    
    // Render education items
    renderEducationItems();
    
    // Render experience items
    renderExperienceItems();
    
    // Render skill items
    renderSkillItems();
}

/**
 * Render education items from stored data
 */
function renderEducationItems() {
    const educationList = document.getElementById('education-list');
    if (!educationList) return;
    
    educationList.innerHTML = '';
    
    resumeData.education.forEach((edu, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-header">
                <h3 class="list-item-title">${edu.institution}</h3>
                <div class="list-item-actions">
                    <button type="button" class="list-item-btn edit" data-index="${index}">
                        <span class="sr-only">Edit</span>
                        ✏️
                    </button>
                    <button type="button" class="list-item-btn delete" data-index="${index}">
                        <span class="sr-only">Delete</span>
                        🗑️
                    </button>
                </div>
            </div>
            <div class="list-item-subtitle">${edu.degree}</div>
            <div class="list-item-subtitle">${formatDateRange(edu.eduStartDate, edu.eduEndDate, edu.eduCurrent)}</div>
        `;
        
        educationList.appendChild(item);
    });
    
    // Add event listeners for edit and delete buttons
    addEducationItemListeners();
}

/**
 * Add event listeners to education item buttons
 */
function addEducationItemListeners() {
    // Edit buttons
    document.querySelectorAll('#education-list .edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            editEducationItem(index);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('#education-list .delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            deleteEducationItem(index);
        });
    });
}

/**
 * Edit an education item
 * @param {number} index - Index of the item to edit
 */
function editEducationItem(index) {
    const edu = resumeData.education[index];
    
    // Fill the form with the education data
    document.getElementById('institution').value = edu.institution;
    document.getElementById('degree').value = edu.degree;
    document.getElementById('eduStartDate').value = edu.eduStartDate;
    document.getElementById('eduEndDate').value = edu.eduEndDate;
    document.getElementById('eduCurrent').checked = edu.eduCurrent;
    document.getElementById('eduDescription').value = edu.eduDescription;
    
    // Store the index being edited
    document.getElementById('add-education').dataset.editIndex = index;
    document.getElementById('add-education').textContent = 'Update Education';
}

/**
 * Delete an education item
 * @param {number} index - Index of the item to delete
 */
function deleteEducationItem(index) {
    if (confirm('Are you sure you want to delete this education entry?')) {
        resumeData.education.splice(index, 1);
        saveToStorage();
        renderEducationItems();
        
        // Dispatch event to update preview
        document.dispatchEvent(new CustomEvent('resumeDataChanged', {
            detail: {
                section: 'education',
                data: resumeData.education
            }
        }));
    }
}

/**
 * Render experience items from stored data
 */
function renderExperienceItems() {
    const experienceList = document.getElementById('experience-list');
    if (!experienceList) return;
    
    experienceList.innerHTML = '';
    
    resumeData.experience.forEach((exp, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-header">
                <h3 class="list-item-title">${exp.position}</h3>
                <div class="list-item-actions">
                    <button type="button" class="list-item-btn edit" data-index="${index}">
                        <span class="sr-only">Edit</span>
                        ✏️
                    </button>
                    <button type="button" class="list-item-btn delete" data-index="${index}">
                        <span class="sr-only">Delete</span>
                        🗑️
                    </button>
                </div>
            </div>
            <div class="list-item-subtitle">${exp.company}</div>
            <div class="list-item-subtitle">${formatDateRange(exp.expStartDate, exp.expEndDate, exp.expCurrent)}</div>
        `;
        
        experienceList.appendChild(item);
    });
    
    // Add event listeners for edit and delete buttons
    addExperienceItemListeners();
}

/**
 * Add event listeners to experience item buttons
 */
function addExperienceItemListeners() {
    // Edit buttons
    document.querySelectorAll('#experience-list .edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            editExperienceItem(index);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('#experience-list .delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            deleteExperienceItem(index);
        });
    });
}

/**
 * Edit an experience item
 * @param {number} index - Index of the item to edit
 */
function editExperienceItem(index) {
    const exp = resumeData.experience[index];
    
    // Fill the form with the experience data
    document.getElementById('company').value = exp.company;
    document.getElementById('position').value = exp.position;
    document.getElementById('expStartDate').value = exp.expStartDate;
    document.getElementById('expEndDate').value = exp.expEndDate;
    document.getElementById('expCurrent').checked = exp.expCurrent;
    document.getElementById('expDescription').value = exp.expDescription;
    
    // Store the index being edited
    document.getElementById('add-experience').dataset.editIndex = index;
    document.getElementById('add-experience').textContent = 'Update Experience';
}

/**
 * Delete an experience item
 * @param {number} index - Index of the item to delete
 */
function deleteExperienceItem(index) {
    if (confirm('Are you sure you want to delete this experience entry?')) {
        resumeData.experience.splice(index, 1);
        saveToStorage();
        renderExperienceItems();
        
        // Dispatch event to update preview
        document.dispatchEvent(new CustomEvent('resumeDataChanged', {
            detail: {
                section: 'experience',
                data: resumeData.experience
            }
        }));
    }
}

/**
 * Render skill items from stored data
 */
function renderSkillItems() {
    const skillsList = document.getElementById('skills-list');
    if (!skillsList) return;
    
    skillsList.innerHTML = '';
    
    resumeData.skills.forEach((skill, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-header">
                <h3 class="list-item-title">${skill.skillName}</h3>
                <div class="list-item-actions">
                    <button type="button" class="list-item-btn edit" data-index="${index}">
                        <span class="sr-only">Edit</span>
                        ✏️
                    </button>
                    <button type="button" class="list-item-btn delete" data-index="${index}">
                        <span class="sr-only">Delete</span>
                        🗑️
                    </button>
                </div>
            </div>
            <div class="list-item-subtitle">${skill.skillLevel}</div>
        `;
        
        skillsList.appendChild(item);
    });
    
    // Add event listeners for edit and delete buttons
    addSkillItemListeners();
}

/**
 * Add event listeners to skill item buttons
 */
function addSkillItemListeners() {
    // Edit buttons
    document.querySelectorAll('#skills-list .edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            editSkillItem(index);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('#skills-list .delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            deleteSkillItem(index);
        });
    });
}

/**
 * Edit a skill item
 * @param {number} index - Index of the item to edit
 */
function editSkillItem(index) {
    const skill = resumeData.skills[index];
    
    // Fill the form with the skill data
    document.getElementById('skillName').value = skill.skillName;
    document.getElementById('skillLevel').value = skill.skillLevel;
    
    // Store the index being edited
    document.getElementById('add-skill').dataset.editIndex = index;
    document.getElementById('add-skill').textContent = 'Update Skill';
}

/**
 * Delete a skill item
 * @param {number} index - Index of the item to delete
 */
function deleteSkillItem(index) {
    if (confirm('Are you sure you want to delete this skill?')) {
        resumeData.skills.splice(index, 1);
        saveToStorage();
        renderSkillItems();
        
        // Dispatch event to update preview
        document.dispatchEvent(new CustomEvent('resumeDataChanged', {
            detail: {
                section: 'skills',
                data: resumeData.skills
            }
        }));
    }
}

/**
 * Format a date range for display
 * @param {string} startDate - Start date in YYYY-MM format
 * @param {string} endDate - End date in YYYY-MM format
 * @param {boolean} current - Whether this is a current position/education
 * @returns {string} Formatted date range
 */
function formatDateRange(startDate, endDate, current) {
    let result = '';
    
    if (startDate) {
        const start = new Date(startDate);
        result += formatDate(start);
    }
    
    result += ' - ';
    
    if (current) {
        result += 'Present';
    } else if (endDate) {
        const end = new Date(endDate);
        result += formatDate(end);
    }
    
    return result;
}

/**
 * Format a date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date (Month Year)
 */
function formatDate(date) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Show storage error message to the user
 */
function showStorageError() {
    alert('There was an error saving your data. This could be due to private browsing mode or storage limits. Your changes may not be saved.');
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

/**
 * Get the current resume data
 * @returns {Object} Current resume data
 */
export function getResumeData() {
    return resumeData;
}

/**
 * Update a specific section of the resume data
 * @param {string} section - Section to update
 * @param {any} data - New data for the section
 */
export function updateResumeData(section, data) {
    resumeData[section] = data;
    saveToStorage();
}

/**
 * Reset all resume data to defaults
 */
export function resetResumeData() {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
        resumeData = { ...defaultResumeData };
        saveToStorage();
        fillFormsWithData();
        
        // Dispatch event to update preview
        document.dispatchEvent(new CustomEvent('resumeDataLoaded', { 
            detail: resumeData 
        }));
    }
} 
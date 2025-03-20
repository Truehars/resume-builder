/**
 * Resume Builder - Main Application
 * Initializes and coordinates all modules
 */

// Import modules
import { initStorage, loadFromStorage } from './storage.js';
import { initUI, updatePreview } from './ui.js';
import { initTemplates } from './templates.js';
import { initValidation } from './validation.js';
import { initExport } from './export.js';

// Initialize the application
function initApp() {
    console.log('Initializing Resume Builder App');
    
    // Initialize all modules
    initStorage();
    initUI();
    initTemplates();
    initValidation();
    initExport();
    
    // Load saved data from localStorage
    loadFromStorage();
    
    // Update the preview with initial data
    updatePreview();
    
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Log initialization complete
    console.log('Resume Builder App initialized successfully');
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Handle beforeunload event to warn about unsaved changes
window.addEventListener('beforeunload', (event) => {
    // This message may not be displayed in modern browsers for security reasons,
    // but the confirmation dialog will still appear
    event.preventDefault();
    event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
}); 
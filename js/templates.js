/**
 * Resume Builder - Templates Module
 * Handles template-related functionality
 */

import { updatePreview } from './ui.js';

/**
 * Initialize the templates module
 */
export function initTemplates() {
    console.log('Initializing templates module');
    
    // Set up template preview images
    setupTemplatePreviewImages();
    
    // Listen for template changes
    listenForTemplateChanges();
}

/**
 * Set up template preview images
 */
function setupTemplatePreviewImages() {
    // Classic template preview
    const classicPreview = document.querySelector('.classic-preview');
    if (classicPreview) {
        classicPreview.innerHTML = generateClassicPreview();
    }
    
    // Modern template preview
    const modernPreview = document.querySelector('.modern-preview');
    if (modernPreview) {
        modernPreview.innerHTML = generateModernPreview();
    }
    
    // Minimal template preview
    const minimalPreview = document.querySelector('.minimal-preview');
    if (minimalPreview) {
        minimalPreview.innerHTML = generateMinimalPreview();
    }
    
    // Academic template preview
    const academicPreview = document.querySelector('.academic-preview');
    if (academicPreview) {
        academicPreview.innerHTML = generateAcademicPreview();
    }
}

/**
 * Generate HTML for classic template preview
 * @returns {string} HTML for preview
 */
function generateClassicPreview() {
    return `
        <div style="padding: 8px; font-family: 'Lora', serif; font-size: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: white;">
            <div style="text-align: center; margin-bottom: 8px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">
                <div style="font-weight: bold; font-size: 10px; color: #1e3a8a;">Name</div>
                <div style="font-style: italic; color: #2563eb;">Position</div>
                <div style="display: flex; justify-content: center; gap: 5px; color: #4b5563; margin-top: 3px;">
                    <span>Email</span>
                    <span>•</span>
                    <span>Phone</span>
                    <span>•</span>
                    <span>Location</span>
                </div>
            </div>
            <div style="margin-bottom: 5px;">
                <div style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; font-size: 6px; color: #1e3a8a; border-bottom: 1px solid #1e3a8a; padding-bottom: 2px; margin-bottom: 3px;">Experience</div>
                <div style="margin-bottom: 3px;">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="font-weight: bold; color: #1e3a8a;">Position</span>
                        <span style="font-style: italic; color: #4b5563;">Date</span>
                    </div>
                    <div style="font-style: italic;">Company</div>
                    <div style="font-size: 4px; margin-top: 1px;">Description of responsibilities and achievements</div>
                </div>
            </div>
            <div style="margin-bottom: 5px;">
                <div style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; font-size: 6px; color: #1e3a8a; border-bottom: 1px solid #1e3a8a; padding-bottom: 2px; margin-bottom: 3px;">Education</div>
                <div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="font-weight: bold; color: #1e3a8a;">Degree</span>
                        <span style="font-style: italic; color: #4b5563;">Date</span>
                    </div>
                    <div style="font-style: italic;">Institution</div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generate HTML for modern template preview
 * @returns {string} HTML for preview
 */
function generateModernPreview() {
    return `
        <div style="display: grid; grid-template-columns: 35% 65%; font-family: 'Source Sans 3', sans-serif; font-size: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: white;">
            <div style="background-color: #1e3a8a; color: white; padding: 8px;">
                <div style="margin-bottom: 5px;">
                    <div style="font-weight: bold; font-size: 8px;">Name</div>
                    <div style="opacity: 0.9;">Position</div>
                </div>
                <div style="margin-bottom: 5px;">
                    <div style="text-transform: uppercase; letter-spacing: 0.5px; font-size: 5px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 2px; margin-bottom: 3px; font-weight: bold;">Contact</div>
                    <div style="font-size: 4px; opacity: 0.9; margin-bottom: 1px;">Email</div>
                    <div style="font-size: 4px; opacity: 0.9; margin-bottom: 1px;">Phone</div>
                    <div style="font-size: 4px; opacity: 0.9;">Location</div>
                </div>
                <div>
                    <div style="text-transform: uppercase; letter-spacing: 0.5px; font-size: 5px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 2px; margin-bottom: 3px; font-weight: bold;">Skills</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 2px;">
                        <span style="background: rgba(255,255,255,0.15); padding: 1px 3px; border-radius: 3px; font-size: 4px;">Skill 1</span>
                        <span style="background: rgba(255,255,255,0.15); padding: 1px 3px; border-radius: 3px; font-size: 4px;">Skill 2</span>
                        <span style="background: rgba(255,255,255,0.15); padding: 1px 3px; border-radius: 3px; font-size: 4px;">Skill 3</span>
                    </div>
                </div>
            </div>
            <div style="padding: 8px;">
                <div style="margin-bottom: 5px;">
                    <div style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; font-size: 6px; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 2px; margin-bottom: 3px;">Experience</div>
                    <div style="margin-bottom: 3px;">
                        <div style="font-weight: bold; color: #1e3a8a;">Position</div>
                        <div style="font-style: italic;">Company</div>
                        <div style="color: #4b5563; font-size: 4px;">Date</div>
                        <div style="font-size: 4px; margin-top: 1px;">Description</div>
                    </div>
                </div>
                <div>
                    <div style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; font-size: 6px; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 2px; margin-bottom: 3px;">Education</div>
                    <div>
                        <div style="font-weight: bold; color: #1e3a8a;">Degree</div>
                        <div style="font-style: italic;">Institution</div>
                        <div style="color: #4b5563; font-size: 4px;">Date</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generate HTML for minimal template preview
 * @returns {string} HTML for preview
 */
function generateMinimalPreview() {
    return `
        <div style="padding: 8px; font-family: 'Source Sans 3', sans-serif; font-size: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: white;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">
                <div>
                    <div style="font-weight: bold; font-size: 10px; color: #1e3a8a;">Name</div>
                    <div style="color: #2563eb;">Position</div>
                </div>
                <div style="text-align: right; font-size: 5px; color: #4b5563;">
                    <div>Email</div>
                    <div>Phone</div>
                    <div>Location</div>
                </div>
            </div>
            <div style="margin-bottom: 5px;">
                <div style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; font-size: 6px; color: #2563eb; margin-bottom: 3px;">Experience</div>
                <div style="display: grid; grid-template-columns: 1fr 3fr; font-size: 5px; gap: 5px;">
                    <div style="text-align: right;">
                        <div style="font-weight: bold;">Date</div>
                        <div>Company</div>
                    </div>
                    <div>
                        <div style="font-weight: bold;">Position</div>
                        <div>Description</div>
                    </div>
                </div>
            </div>
            <div>
                <div style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; font-size: 6px; color: #2563eb; margin-bottom: 3px;">Skills</div>
                <div style="display: flex; flex-wrap: wrap; gap: 2px; font-size: 4px;">
                    <span style="background: #f3f4f6; padding: 1px 4px; border-radius: 20px;">Skill 1</span>
                    <span style="background: #f3f4f6; padding: 1px 4px; border-radius: 20px;">Skill 2</span>
                    <span style="background: #f3f4f6; padding: 1px 4px; border-radius: 20px;">Skill 3</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generate HTML for academic template preview
 * @returns {string} HTML for preview
 */
function generateAcademicPreview() {
    return `
        <div style="padding: 8px; font-family: 'Source Sans 3', sans-serif; font-size: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: white;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px;">
                <div>
                    <div style="font-weight: bold; font-size: 10px; color: #1e3a8a; font-family: 'Playfair Display', serif;">Name</div>
                    <div style="font-style: italic; color: #4b5563;">Position</div>
                    <div style="font-style: italic; color: #4b5563;">Department</div>
                </div>
                <div style="text-align: right; color: #4b5563;">
                    <div>Email</div>
                    <div>Phone</div>
                </div>
            </div>
            <div style="margin-bottom: 5px;">
                <div style="background-color: #f0f0f0; padding: 2px 4px; margin: 3px 0; font-weight: bold; font-size: 5px; border-left: 2px solid #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; color: #1e3a8a;">
                    Academic Qualifications
                </div>
                <div style="display: flex; font-size: 4px; border: 1px solid #d3d3d3; margin-bottom: 3px;">
                    <div style="flex: 1; border-right: 1px solid #d3d3d3; padding: 1px;">Year</div>
                    <div style="flex: 2; border-right: 1px solid #d3d3d3; padding: 1px;">Degree</div>
                    <div style="flex: 2; border-right: 1px solid #d3d3d3; padding: 1px;">Institute</div>
                    <div style="flex: 1; padding: 1px;">Grade</div>
                </div>
            </div>
            <div style="margin-bottom: 3px;">
                <div style="background-color: #f0f0f0; padding: 2px 4px; margin: 3px 0; font-weight: bold; font-size: 5px; border-left: 2px solid #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; color: #1e3a8a;">
                    Scholastic Achievements
                </div>
                <div style="margin-bottom: 3px; padding-left: 5px; font-size: 4px;">
                    <span>• Achievement</span>
                </div>
            </div>
            <div style="margin-bottom: 3px;">
                <div style="background-color: #f0f0f0; padding: 2px 4px; margin: 3px 0; font-weight: bold; font-size: 5px; border-left: 2px solid #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; color: #1e3a8a;">
                    Competitive Programming
                </div>
                <div style="margin-bottom: 3px; padding-left: 5px; font-size: 4px;">
                    <span>• Competition</span>
                </div>
            </div>
            <div style="margin-bottom: 3px;">
                <div style="background-color: #f0f0f0; padding: 2px 4px; margin: 3px 0; font-weight: bold; font-size: 5px; border-left: 2px solid #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; color: #1e3a8a;">
                    Extra Curriculars
                </div>
                <div style="margin-bottom: 3px; padding-left: 5px; font-size: 4px;">
                    <span>• Activity</span>
                </div>
            </div>
            <div style="margin-bottom: 3px;">
                <div style="background-color: #f0f0f0; padding: 2px 4px; margin: 3px 0; font-weight: bold; font-size: 5px; border-left: 2px solid #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; color: #1e3a8a;">
                    Skills
                </div>
                <div style="font-size: 4px; padding: 1px 5px;">
                    <strong>Programming Languages:</strong> Skill 1, Skill 2, Skill 3
                </div>
            </div>
            <div style="margin-bottom: 3px;">
                <div style="background-color: #f0f0f0; padding: 2px 4px; margin: 3px 0; font-weight: bold; font-size: 5px; border-left: 2px solid #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; color: #1e3a8a;">
                    Projects
                </div>
                <div style="margin-bottom: 3px; padding-left: 2px; font-size: 4px;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold;">
                        <span>Project Title</span>
                        <span style="font-style: italic; font-weight: normal; color: #4b5563;">(Date)</span>
                    </div>
                    <div style="padding-left: 5px;">
                        <span>• Description</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Listen for template changes
 */
function listenForTemplateChanges() {
    document.addEventListener('resumeDataLoaded', (e) => {
        if (e.detail && e.detail.settings) {
            updateTemplateSelection(e.detail.settings.template);
        }
    });
    
    document.addEventListener('settingsChanged', (e) => {
        if (e.detail && e.detail.template) {
            updateTemplateSelection(e.detail.template);
            updatePreview();
        }
    });
}

/**
 * Update template selection in the UI
 * @param {string} template - Selected template
 */
function updateTemplateSelection(template) {
    const templateOptions = document.querySelectorAll('.template-option');
    templateOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.template === template) {
            option.classList.add('active');
        }
    });
} 
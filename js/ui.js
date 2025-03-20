/**
 * Resume Builder - UI Module
 * Handles DOM interactions and UI updates
 */

import { getResumeData, updateResumeData } from './storage.js';

/**
 * Initialize the UI module
 */
export function initUI() {
    console.log('Initializing UI module');
    
    // Set up navigation between form steps
    setupNavigation();
    
    // Set up form submission handlers
    setupFormHandlers();
    
    // Set up customization controls
    setupCustomizationControls();
}

/**
 * Set up navigation between form steps
 */
function setupNavigation() {
    // Step navigation
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('click', () => {
            const targetStep = step.dataset.step;
            navigateToStep(targetStep);
        });
    });
    
    // Next buttons
    const nextButtons = document.querySelectorAll('.btn-next');
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nextStep = button.dataset.next;
            navigateToStep(nextStep);
        });
    });
    
    // Previous buttons
    const prevButtons = document.querySelectorAll('.btn-prev');
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const prevStep = button.dataset.prev;
            navigateToStep(prevStep);
        });
    });
}

/**
 * Navigate to a specific form step
 * @param {string} stepId - ID of the step to navigate to
 */
function navigateToStep(stepId) {
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.classList.remove('active');
        if (step.dataset.step === stepId) {
            step.classList.add('active');
        }
    });
    
    // Show the selected form step
    const formSteps = document.querySelectorAll('.form-step');
    formSteps.forEach(formStep => {
        formStep.classList.remove('active');
        if (formStep.id === `${stepId}-form`) {
            formStep.classList.add('active');
        }
    });
    
    // Scroll to top of form
    document.querySelector('.form-section').scrollTop = 0;
}

/**
 * Set up form submission handlers
 */
function setupFormHandlers() {
    // Education form
    const addEducationBtn = document.getElementById('add-education');
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', () => {
            handleEducationForm();
        });
    }
    
    // Experience form
    const addExperienceBtn = document.getElementById('add-experience');
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', () => {
            handleExperienceForm();
        });
    }
    
    // Skills form
    const addSkillBtn = document.getElementById('add-skill');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', () => {
            handleSkillForm();
        });
    }
    
    // Handle "currently studying/working" checkboxes
    const eduCurrentCheckbox = document.getElementById('eduCurrent');
    if (eduCurrentCheckbox) {
        eduCurrentCheckbox.addEventListener('change', () => {
            const endDateInput = document.getElementById('eduEndDate');
            endDateInput.disabled = eduCurrentCheckbox.checked;
            if (eduCurrentCheckbox.checked) {
                endDateInput.value = '';
            }
        });
    }
    
    const expCurrentCheckbox = document.getElementById('expCurrent');
    if (expCurrentCheckbox) {
        expCurrentCheckbox.addEventListener('change', () => {
            const endDateInput = document.getElementById('expEndDate');
            endDateInput.disabled = expCurrentCheckbox.checked;
            if (expCurrentCheckbox.checked) {
                endDateInput.value = '';
            }
        });
    }
    
    // Print button
    const printButton = document.getElementById('print-resume');
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }
}

/**
 * Handle education form submission
 */
function handleEducationForm() {
    const institution = document.getElementById('institution').value.trim();
    const degree = document.getElementById('degree').value.trim();
    const startDate = document.getElementById('eduStartDate').value;
    const endDate = document.getElementById('eduEndDate').value;
    const current = document.getElementById('eduCurrent').checked;
    const description = document.getElementById('eduDescription').value.trim();
    
    // Validate required fields
    if (!institution || !degree) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Get current education data
    const resumeData = getResumeData();
    const education = [...resumeData.education];
    
    // Check if we're editing an existing item
    const editButton = document.getElementById('add-education');
    const editIndex = editButton.dataset.editIndex;
    
    if (editIndex !== undefined) {
        // Update existing item
        education[editIndex] = {
            institution,
            degree,
            eduStartDate: startDate,
            eduEndDate: endDate,
            eduCurrent: current,
            eduDescription: description
        };
        
        // Reset edit state
        delete editButton.dataset.editIndex;
        editButton.textContent = 'Add Education';
    } else {
        // Add new item
        education.push({
            institution,
            degree,
            eduStartDate: startDate,
            eduEndDate: endDate,
            eduCurrent: current,
            eduDescription: description
        });
    }
    
    // Update data
    updateResumeData('education', education);
    
    // Clear form
    document.getElementById('education-info-form').reset();
    
    // Update preview
    updatePreview();
    
    // Dispatch event for other modules
    document.dispatchEvent(new CustomEvent('resumeDataChanged', {
        detail: {
            section: 'education',
            data: education
        }
    }));
}

/**
 * Handle experience form submission
 */
function handleExperienceForm() {
    const company = document.getElementById('company').value.trim();
    const position = document.getElementById('position').value.trim();
    const startDate = document.getElementById('expStartDate').value;
    const endDate = document.getElementById('expEndDate').value;
    const current = document.getElementById('expCurrent').checked;
    const description = document.getElementById('expDescription').value.trim();
    
    // Validate required fields
    if (!company || !position) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Get current experience data
    const resumeData = getResumeData();
    const experience = [...resumeData.experience];
    
    // Check if we're editing an existing item
    const editButton = document.getElementById('add-experience');
    const editIndex = editButton.dataset.editIndex;
    
    if (editIndex !== undefined) {
        // Update existing item
        experience[editIndex] = {
            company,
            position,
            expStartDate: startDate,
            expEndDate: endDate,
            expCurrent: current,
            expDescription: description
        };
        
        // Reset edit state
        delete editButton.dataset.editIndex;
        editButton.textContent = 'Add Experience';
    } else {
        // Add new item
        experience.push({
            company,
            position,
            expStartDate: startDate,
            expEndDate: endDate,
            expCurrent: current,
            expDescription: description
        });
    }
    
    // Update data
    updateResumeData('experience', experience);
    
    // Clear form
    document.getElementById('experience-info-form').reset();
    
    // Update preview
    updatePreview();
    
    // Dispatch event for other modules
    document.dispatchEvent(new CustomEvent('resumeDataChanged', {
        detail: {
            section: 'experience',
            data: experience
        }
    }));
}

/**
 * Handle skill form submission
 */
function handleSkillForm() {
    const skillName = document.getElementById('skillName').value.trim();
    const skillLevel = document.getElementById('skillLevel').value;
    
    // Validate required fields
    if (!skillName) {
        alert('Please enter a skill name.');
        return;
    }
    
    // Get current skills data
    const resumeData = getResumeData();
    const skills = [...resumeData.skills];
    
    // Check if we're editing an existing item
    const editButton = document.getElementById('add-skill');
    const editIndex = editButton.dataset.editIndex;
    
    if (editIndex !== undefined) {
        // Update existing item
        skills[editIndex] = {
            skillName,
            skillLevel
        };
        
        // Reset edit state
        delete editButton.dataset.editIndex;
        editButton.textContent = 'Add Skill';
    } else {
        // Add new item
        skills.push({
            skillName,
            skillLevel
        });
    }
    
    // Update data
    updateResumeData('skills', skills);
    
    // Clear form
    document.getElementById('skills-info-form').reset();
    
    // Update preview
    updatePreview();
    
    // Dispatch event for other modules
    document.dispatchEvent(new CustomEvent('resumeDataChanged', {
        detail: {
            section: 'skills',
            data: skills
        }
    }));
}

/**
 * Set up customization controls
 */
function setupCustomizationControls() {
    // Template selection
    const templateOptions = document.querySelectorAll('.template-option');
    templateOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Update active class
            templateOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Get selected template
            const template = option.dataset.template;
            
            // Update preview
            const previewElement = document.getElementById('resume-preview');
            previewElement.className = `resume-preview template-${template} color-${getResumeData().settings.color} font-size-${getResumeData().settings.fontSize}`;
            
            // Update settings
            const settings = { ...getResumeData().settings, template };
            updateResumeData('settings', settings);
            
            // Dispatch event for other modules
            document.dispatchEvent(new CustomEvent('settingsChanged', {
                detail: { template }
            }));
        });
    });
    
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Update active class
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Get selected color
            const color = option.dataset.color;
            
            // Update preview
            const previewElement = document.getElementById('resume-preview');
            previewElement.className = `resume-preview template-${getResumeData().settings.template} color-${color} font-size-${getResumeData().settings.fontSize}`;
            
            // Update settings
            const settings = { ...getResumeData().settings, color };
            updateResumeData('settings', settings);
            
            // Dispatch event for other modules
            document.dispatchEvent(new CustomEvent('settingsChanged', {
                detail: { color }
            }));
        });
    });
    
    // Font size adjustment
    const fontSizeInput = document.getElementById('fontSize');
    if (fontSizeInput) {
        fontSizeInput.addEventListener('input', () => {
            const fontSize = fontSizeInput.value;
            
            // Update display
            document.getElementById('fontSizeValue').textContent = `${fontSize}%`;
            
            // Update preview
            const previewElement = document.getElementById('resume-preview');
            
            // Remove existing font size classes
            const fontSizeClasses = Array.from(previewElement.classList)
                .filter(cls => cls.startsWith('font-size-'));
            fontSizeClasses.forEach(cls => previewElement.classList.remove(cls));
            
            // Add new font size class
            previewElement.classList.add(`font-size-${fontSize}`);
            
            // Update settings
            const settings = { ...getResumeData().settings, fontSize: parseInt(fontSize) };
            updateResumeData('settings', settings);
            
            // Dispatch event for other modules
            document.dispatchEvent(new CustomEvent('settingsChanged', {
                detail: { fontSize: parseInt(fontSize) }
            }));
        });
    }
}

/**
 * Update the resume preview with current data
 */
export function updatePreview() {
    const resumeData = getResumeData();
    const previewElement = document.getElementById('resume-preview');
    
    if (!previewElement) return;
    
    // Set template and color classes
    const { template, color, fontSize } = resumeData.settings;
    previewElement.className = `resume-preview template-${template} color-${color} font-size-${fontSize}`;
    
    // Generate HTML based on template
    let html = '';
    
    switch (template) {
        case 'modern':
            html = generateModernTemplate(resumeData);
            break;
        case 'minimal':
            html = generateMinimalTemplate(resumeData);
            break;
        case 'academic':
            html = generateAcademicTemplate(resumeData);
            break;
        case 'classic':
        default:
            html = generateClassicTemplate(resumeData);
            break;
    }
    
    // Update preview content
    previewElement.innerHTML = html;
}

/**
 * Generate HTML for the classic template
 * @param {Object} data - Resume data
 * @returns {string} HTML for the template
 */
function generateClassicTemplate(data) {
    const { personal, education, experience, skills } = data;
    
    // Check if we have data to display
    if (!personal.fullName) {
        return `<div class="resume-loading">
            <p>Fill in your information to see the preview</p>
        </div>`;
    }
    
    return `
        <div class="resume-header">
            <h1>${personal.fullName}</h1>
            ${personal.jobTitle ? `<div class="job-title">${personal.jobTitle}</div>` : ''}
            
            <div class="contact-info">
                ${personal.email ? `<div class="contact-item">${personal.email}</div>` : ''}
                ${personal.phone ? `<div class="contact-item">${personal.phone}</div>` : ''}
                ${personal.location ? `<div class="contact-item">${personal.location}</div>` : ''}
                ${personal.website ? `<div class="contact-item"><a href="${personal.website}" target="_blank">${personal.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
                ${personal.linkedin ? `<div class="contact-item"><a href="${personal.linkedin}" target="_blank">LinkedIn</a></div>` : ''}
            </div>
        </div>
        
        <div class="resume-body">
            ${personal.summary ? `
                <section class="summary-section">
                    <h2 class="section-title">Professional Summary</h2>
                    <p>${personal.summary}</p>
                </section>
            ` : ''}
            
            ${experience.length > 0 ? `
                <section class="experience-section">
                    <h2 class="section-title">Work Experience</h2>
                    ${experience.map(exp => `
                        <div class="entry">
                            <div class="entry-title">
                                <span class="title">${exp.position}</span>
                                <span class="date">${formatDateRange(exp.expStartDate, exp.expEndDate, exp.expCurrent)}</span>
                            </div>
                            <div class="entry-subtitle">${exp.company}</div>
                            ${exp.expDescription ? `<div class="entry-description">${exp.expDescription}</div>` : ''}
                        </div>
                    `).join('')}
                </section>
            ` : ''}
            
            ${education.length > 0 ? `
                <section class="education-section">
                    <h2 class="section-title">Education</h2>
                    ${education.map(edu => `
                        <div class="entry">
                            <div class="entry-title">
                                <span class="title">${edu.degree}</span>
                                <span class="date">${formatDateRange(edu.eduStartDate, edu.eduEndDate, edu.eduCurrent)}</span>
                            </div>
                            <div class="entry-subtitle">${edu.institution}</div>
                            ${edu.eduDescription ? `<div class="entry-description">${edu.eduDescription}</div>` : ''}
                        </div>
                    `).join('')}
                </section>
            ` : ''}
            
            ${skills.length > 0 ? `
                <section class="skills-section">
                    <h2 class="section-title">Skills</h2>
                    <ul class="skills-list">
                        ${skills.map(skill => `
                            <li class="skill-item">${skill.skillName} ${skill.skillLevel ? `(${skill.skillLevel})` : ''}</li>
                        `).join('')}
                    </ul>
                </section>
            ` : ''}
        </div>
    `;
}

/**
 * Generate HTML for the modern template
 * @param {Object} data - Resume data
 * @returns {string} HTML for the template
 */
function generateModernTemplate(data) {
    const { personal, education, experience, skills } = data;
    
    // Check if we have data to display
    if (!personal.fullName) {
        return `<div class="resume-loading">
            <p>Fill in your information to see the preview</p>
        </div>`;
    }
    
    return `
        <div class="resume-sidebar">
            <div class="resume-header">
                <h1>${personal.fullName}</h1>
                ${personal.jobTitle ? `<div class="job-title">${personal.jobTitle}</div>` : ''}
            </div>
            
            <div class="contact-info">
                ${personal.email ? `<div class="contact-item">${personal.email}</div>` : ''}
                ${personal.phone ? `<div class="contact-item">${personal.phone}</div>` : ''}
                ${personal.location ? `<div class="contact-item">${personal.location}</div>` : ''}
                ${personal.website ? `<div class="contact-item"><a href="${personal.website}" target="_blank">${personal.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
                ${personal.linkedin ? `<div class="contact-item"><a href="${personal.linkedin}" target="_blank">LinkedIn</a></div>` : ''}
            </div>
            
            ${skills.length > 0 ? `
                <section class="skills-section">
                    <h2 class="section-title">Skills</h2>
                    <ul class="skills-list">
                        ${skills.map(skill => `
                            <li class="skill-item">${skill.skillName} ${skill.skillLevel ? `(${skill.skillLevel})` : ''}</li>
                        `).join('')}
                    </ul>
                </section>
            ` : ''}
            
            ${education.length > 0 ? `
                <section class="education-section">
                    <h2 class="section-title">Education</h2>
                    ${education.map(edu => `
                        <div class="entry">
                            <div class="entry-title">${edu.degree}</div>
                            <div class="entry-subtitle">${edu.institution}</div>
                            <div class="entry-date">${formatDateRange(edu.eduStartDate, edu.eduEndDate, edu.eduCurrent)}</div>
                            ${edu.eduDescription ? `<div class="entry-description">${edu.eduDescription}</div>` : ''}
                        </div>
                    `).join('')}
                </section>
            ` : ''}
        </div>
        
        <div class="resume-main">
            ${personal.summary ? `
                <section class="summary-section">
                    <h2 class="section-title">Professional Summary</h2>
                    <p>${personal.summary}</p>
                </section>
            ` : ''}
            
            ${experience.length > 0 ? `
                <section class="experience-section">
                    <h2 class="section-title">Work Experience</h2>
                    ${experience.map(exp => `
                        <div class="entry">
                            <div class="entry-title">${exp.position}</div>
                            <div class="entry-subtitle">${exp.company}</div>
                            <div class="entry-date">${formatDateRange(exp.expStartDate, exp.expEndDate, exp.expCurrent)}</div>
                            ${exp.expDescription ? `<div class="entry-description">${exp.expDescription}</div>` : ''}
                        </div>
                    `).join('')}
                </section>
            ` : ''}
        </div>
    `;
}

/**
 * Generate HTML for the minimal template
 * @param {Object} data - Resume data
 * @returns {string} HTML for the template
 */
function generateMinimalTemplate(data) {
    const { personal, education, experience, skills } = data;
    
    // Check if we have data to display
    if (!personal.fullName) {
        return `<div class="resume-loading">
            <p>Fill in your information to see the preview</p>
        </div>`;
    }
    
    return `
        <div class="resume-header">
            <div class="resume-header-left">
                <h1>${personal.fullName}</h1>
                ${personal.jobTitle ? `<div class="job-title">${personal.jobTitle}</div>` : ''}
            </div>
            
            <div class="contact-info">
                ${personal.email ? `<div class="contact-item">${personal.email}</div>` : ''}
                ${personal.phone ? `<div class="contact-item">${personal.phone}</div>` : ''}
                ${personal.location ? `<div class="contact-item">${personal.location}</div>` : ''}
                ${personal.website ? `<div class="contact-item"><a href="${personal.website}" target="_blank">${personal.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
                ${personal.linkedin ? `<div class="contact-item"><a href="${personal.linkedin}" target="_blank">LinkedIn</a></div>` : ''}
            </div>
        </div>
        
        <div class="resume-body">
            ${personal.summary ? `
                <section class="summary-section">
                    <h2 class="section-title">Professional Summary</h2>
                    <div class="entry">
                        <div class="entry-right">
                            <p>${personal.summary}</p>
                        </div>
                    </div>
                </section>
            ` : ''}
            
            ${experience.length > 0 ? `
                <section class="experience-section">
                    <h2 class="section-title">Work Experience</h2>
                    ${experience.map(exp => `
                        <div class="entry">
                            <div class="entry-left">
                                <div class="entry-date">${formatDateRange(exp.expStartDate, exp.expEndDate, exp.expCurrent)}</div>
                                <div class="entry-subtitle">${exp.company}</div>
                            </div>
                            <div class="entry-right">
                                <div class="entry-title">${exp.position}</div>
                                ${exp.expDescription ? `<div class="entry-description">${exp.expDescription}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </section>
            ` : ''}
            
            ${education.length > 0 ? `
                <section class="education-section">
                    <h2 class="section-title">Education</h2>
                    ${education.map(edu => `
                        <div class="entry">
                            <div class="entry-left">
                                <div class="entry-date">${formatDateRange(edu.eduStartDate, edu.eduEndDate, edu.eduCurrent)}</div>
                                <div class="entry-subtitle">${edu.institution}</div>
                            </div>
                            <div class="entry-right">
                                <div class="entry-title">${edu.degree}</div>
                                ${edu.eduDescription ? `<div class="entry-description">${edu.eduDescription}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </section>
            ` : ''}
            
            ${skills.length > 0 ? `
                <section class="skills-section">
                    <h2 class="section-title">Skills</h2>
                    <div class="entry">
                        <ul class="skills-list">
                            ${skills.map(skill => `
                                <li class="skill-item">${skill.skillName} ${skill.skillLevel ? `(${skill.skillLevel})` : ''}</li>
                            `).join('')}
                        </ul>
                    </div>
                </section>
            ` : ''}
        </div>
    `;
}

/**
 * Generate HTML for the academic template
 * @param {Object} data - Resume data
 * @returns {string} HTML for the template
 */
function generateAcademicTemplate(data) {
    const { personal, education, experience, skills } = data;
    
    // Check if we have data to display
    if (!personal.fullName) {
        return `<div class="resume-loading">
            <p>Fill in your information to see the preview</p>
        </div>`;
    }
    
    // Filter skills by category
    const technicalSkills = skills.filter(skill => 
        !skill.skillLevel || 
        (skill.skillLevel !== 'Competitive Programming' && 
         skill.skillLevel !== 'Extra Curricular'));
    
    const competitiveProgramming = skills.filter(skill => 
        skill.skillLevel === 'Competitive Programming');
    
    const extraCurriculars = skills.filter(skill => 
        skill.skillLevel === 'Extra Curricular');
    
    return `
        <div class="resume-header">
            <div class="resume-header-left">
                <h1>${personal.fullName}</h1>
                <div class="job-title">${personal.jobTitle || 'Junior Undergraduate'}</div>
                <div class="department">Department of Computer Science and Engineering</div>
            </div>
            <div class="resume-header-right">
                <div class="contact-info">
                    ${personal.linkedin ? `<div class="contact-item">
                        <span>LinkedIn: ${personal.linkedin.replace(/^https?:\/\/linkedin\.com\/in\//, '')}</span>
                    </div>` : ''}
                    ${personal.email ? `<div class="contact-item">
                        <span>Email: ${personal.email}</span>
                    </div>` : ''}
                    ${personal.phone ? `<div class="contact-item">
                        <span>Phone: ${personal.phone}</span>
                    </div>` : ''}
                </div>
            </div>
        </div>
        
        <div class="resume-body">
            <div class="section">
                <h2 class="section-title">Academic Qualifications</h2>
                ${education.length > 0 ? `
                    <table class="education-table">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Degree/Certificate</th>
                                <th>Institute</th>
                                <th>CPI/%</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${education.map(edu => `
                                <tr>
                                    <td>${formatDateRange(edu.eduStartDate, edu.eduEndDate, edu.eduCurrent)}</td>
                                    <td>${edu.degree}</td>
                                    <td>${edu.institution}</td>
                                    <td>${edu.eduDescription || ''}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : '<p>No education information added yet.</p>'}
            </div>
            
            <div class="section">
                <h2 class="section-title">Scholastic Achievements</h2>
                ${personal.summary ? `
                    <ul class="bullet-list">
                        ${personal.summary.split('\n').map(line => `<li>${line}</li>`).join('')}
                    </ul>
                ` : '<p>Add your scholastic achievements in the Professional Summary field.</p>'}
            </div>
            
            <div class="section">
                <h2 class="section-title">Competitive Programming</h2>
                ${competitiveProgramming.length > 0 ? `
                    <ul class="bullet-list">
                        ${competitiveProgramming.map(skill => `<li>${skill.skillName}</li>`).join('')}
                    </ul>
                ` : `
                    <p>Add competitive programming achievements as skills with "Competitive Programming" level.</p>
                `}
            </div>
            
            <div class="section">
                <h2 class="section-title">Extra Curriculars</h2>
                ${extraCurriculars.length > 0 ? `
                    <ul class="bullet-list">
                        ${extraCurriculars.map(skill => `<li>${skill.skillName}</li>`).join('')}
                    </ul>
                ` : `
                    <p>Add extracurricular activities as skills with "Extra Curricular" level.</p>
                `}
            </div>
            
            ${technicalSkills.length > 0 ? `
                <div class="section">
                    <h2 class="section-title">Technical Skills</h2>
                    <div>
                        <strong>Programming Languages:</strong> 
                        <span class="skills-list">
                            ${technicalSkills.map(skill => `<span class="skill-item">${skill.skillName}</span>`).join('')}
                        </span>
                    </div>
                </div>
            ` : ''}
            
            ${experience.length > 0 ? `
                <div class="section">
                    <h2 class="section-title">Key Projects</h2>
                    ${experience.map(exp => `
                        <div class="project-item">
                            <div class="project-title">
                                <span>${exp.position}</span>
                                <span class="project-date">${formatDateRange(exp.expStartDate, exp.expEndDate, exp.expCurrent)}</span>
                            </div>
                            ${exp.expDescription ? `
                                <ul class="bullet-list project-description">
                                    ${exp.expDescription.split('\n').map(line => `<li>${line}</li>`).join('')}
                                </ul>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
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
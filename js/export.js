/**
 * Resume Builder - Export Module
 * Handles PDF generation and download
 */

import { getResumeData } from './storage.js';

/**
 * Initialize the export module
 */
export function initExport() {
    console.log('Initializing export module');
    
    // Set up download button
    setupDownloadButton();
}

/**
 * Set up the download PDF button
 */
function setupDownloadButton() {
    const downloadButton = document.getElementById('download-pdf');
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            generatePDF();
        });
    }
}

/**
 * Generate and download PDF
 */
function generatePDF() {
    // Check if we have data to export
    const resumeData = getResumeData();
    if (!resumeData.personal.fullName) {
        alert('Please fill in your personal information before downloading.');
        return;
    }
    
    // Show loading state
    const downloadButton = document.getElementById('download-pdf');
    const originalText = downloadButton.textContent;
    downloadButton.textContent = 'Preparing PDF...';
    downloadButton.disabled = true;
    
    // Use window.print() for PDF generation
    // This will use the print.css stylesheet for styling
    setTimeout(() => {
        window.print();
        
        // Reset button state
        downloadButton.textContent = originalText;
        downloadButton.disabled = false;
    }, 500);
}

/**
 * Alternative PDF generation using HTML2Canvas and jsPDF
 * This method requires external libraries, so it's commented out
 * Uncomment and include the libraries if you want to use this approach
 */
/*
function generatePDFWithLibraries() {
    // Check if we have data to export
    const resumeData = getResumeData();
    if (!resumeData.personal.fullName) {
        alert('Please fill in your personal information before downloading.');
        return;
    }
    
    // Show loading state
    const downloadButton = document.getElementById('download-pdf');
    const originalText = downloadButton.textContent;
    downloadButton.textContent = 'Preparing PDF...';
    downloadButton.disabled = true;
    
    // Get the resume preview element
    const element = document.getElementById('resume-preview');
    
    // Set up filename
    const filename = `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
    
    // Use html2canvas to capture the element
    html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
    }).then(canvas => {
        // Convert canvas to PDF using jsPDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
        
        // Reset button state
        downloadButton.textContent = originalText;
        downloadButton.disabled = false;
    }).catch(error => {
        console.error('Error generating PDF:', error);
        alert('There was an error generating your PDF. Please try again.');
        
        // Reset button state
        downloadButton.textContent = originalText;
        downloadButton.disabled = false;
    });
}
*/ 
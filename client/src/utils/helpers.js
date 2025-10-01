/**
 * Format date to readable string
 * @param {Date|string} date 
 * @returns {string}
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Truncate text to specified length
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Copy text to clipboard
 * @param {string} text 
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

/**
 * Download text as markdown file
 * @param {string} content - Content to download
 * @param {string} filename - File name
 */
export const downloadAsMarkdown = (content, filename = 'document.md') => {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Download text as PDF file
 * @param {string} content - Content to download
 * @param {string} title - Document title
 * @param {string} filename - File name
 */
export const downloadAsPDF = async (content, title = 'Document', filename = 'document.pdf') => {
  try {
    // Dynamic import to reduce bundle size
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set document properties
    doc.setProperties({
      title: title,
      author: 'AI Content Toolkit',
      creator: 'AI Content Toolkit'
    });

    // Page settings
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxLineWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(title, maxLineWidth);
    doc.text(titleLines, margin, yPosition);
    yPosition += (titleLines.length * 10) + 10;

    // Content
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    // Process content line by line
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if we need a new page
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      
      // Handle different markdown elements
      if (line.startsWith('# ')) {
        // H1
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        const text = line.substring(2);
        const textLines = doc.splitTextToSize(text, maxLineWidth);
        doc.text(textLines, margin, yPosition);
        yPosition += (textLines.length * 9) + 6;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
      } else if (line.startsWith('## ')) {
        // H2
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        const text = line.substring(3);
        const textLines = doc.splitTextToSize(text, maxLineWidth);
        doc.text(textLines, margin, yPosition);
        yPosition += (textLines.length * 7) + 5;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
      } else if (line.startsWith('### ')) {
        // H3
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        const text = line.substring(4);
        const textLines = doc.splitTextToSize(text, maxLineWidth);
        doc.text(textLines, margin, yPosition);
        yPosition += (textLines.length * 6) + 4;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        // List item
        const text = '• ' + line.substring(2);
        const textLines = doc.splitTextToSize(text, maxLineWidth - 5);
        doc.text(textLines, margin + 5, yPosition);
        yPosition += (textLines.length * 5) + 2;
      } else if (line.trim() === '') {
        // Empty line
        yPosition += 4;
      } else {
        // Regular text
        const textLines = doc.splitTextToSize(line, maxLineWidth);
        doc.text(textLines, margin, yPosition);
        yPosition += (textLines.length * 5) + 2;
      }
    }

    // Add footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Save the PDF
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

/**
 * Get tool display name
 * @param {string} toolType 
 * @returns {string}
 */
export const getToolDisplayName = (toolType) => {
  const names = {
    social_media: 'Social Media Post',
    blog_ideas: 'Blog Post Ideas',
    code_explainer: 'Code Explainer',
    full_blog: 'Full Blog Post',
  };
  return names[toolType] || toolType;
};

/**
 * Get tool icon emoji
 * @param {string} toolType 
 * @returns {string}
 */
export const getToolIcon = (toolType) => {
  const icons = {
    social_media: '📱',
    blog_ideas: '📝',
    code_explainer: '💻',
    full_blog: '📰',
  };
  return icons[toolType] || '🔧';
};

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Format credit amount
 * @param {number} credits 
 * @returns {string}
 */
export const formatCredits = (credits) => {
  return credits.toLocaleString();
};



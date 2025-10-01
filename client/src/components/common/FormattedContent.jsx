import React from 'react';

/**
 * FormattedContent - Renders markdown-style content with beautiful formatting
 */
const FormattedContent = ({ content, className = '' }) => {
  if (!content) return null;

  const formatContent = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let listItems = [];
    let inList = false;
    let codeBlock = '';
    let inCodeBlock = false;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Code blocks
      if (trimmedLine.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${index}`} className="bg-dark-bg rounded-lg p-4 overflow-x-auto my-4 border border-dark-border">
              <code className="text-sm text-accent-400 font-mono">{codeBlock}</code>
            </pre>
          );
          codeBlock = '';
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlock += line + '\n';
        return;
      }

      // Headings
      if (trimmedLine.startsWith('### ')) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 my-4 pl-4">
              {listItems}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-bold text-dark-text mt-8 mb-4 flex items-center">
            <span className="text-accent-500 mr-2">▸</span>
            {trimmedLine.replace('### ', '')}
          </h3>
        );
      } else if (trimmedLine.startsWith('## ')) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 my-4 pl-4">
              {listItems}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold text-dark-text mt-10 mb-5 pb-2 border-b-2 border-accent-500/30">
            {trimmedLine.replace('## ', '')}
          </h2>
        );
      } else if (trimmedLine.startsWith('# ')) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 my-4 pl-4">
              {listItems}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        elements.push(
          <h1 key={`h1-${index}`} className="text-3xl font-bold bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent mt-12 mb-6">
            {trimmedLine.replace('# ', '')}
          </h1>
        );
      }
      // List items
      else if (trimmedLine.match(/^[\-\*\+]\s/) || trimmedLine.match(/^\d+\.\s/)) {
        const content = trimmedLine.replace(/^[\-\*\+\d\.]\s+/, '');
        listItems.push(
          <li key={`li-${index}`} className="text-dark-text leading-relaxed">
            {formatInlineStyles(content)}
          </li>
        );
        inList = true;
      }
      // Blockquotes
      else if (trimmedLine.startsWith('> ')) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 my-4 pl-4">
              {listItems}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        elements.push(
          <blockquote key={`quote-${index}`} className="border-l-4 border-accent-500 pl-4 py-2 my-4 bg-dark-bg/50 rounded-r italic text-dark-muted">
            {formatInlineStyles(trimmedLine.replace('> ', ''))}
          </blockquote>
        );
      }
      // Horizontal rules
      else if (trimmedLine === '---' || trimmedLine === '***') {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 my-4 pl-4">
              {listItems}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        elements.push(
          <hr key={`hr-${index}`} className="my-8 border-dark-border" />
        );
      }
      // Regular paragraphs
      else if (trimmedLine) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 my-4 pl-4">
              {listItems}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        elements.push(
          <p key={`p-${index}`} className="text-dark-text leading-relaxed my-4">
            {formatInlineStyles(trimmedLine)}
          </p>
        );
      }
      // Empty lines
      else if (inList && !trimmedLine) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-2 my-4 pl-4">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    });

    // Add any remaining list items
    if (listItems.length > 0) {
      elements.push(
        <ul key="list-final" className="list-disc list-inside space-y-2 my-4 pl-4">
          {listItems}
        </ul>
      );
    }

    return elements;
  };

  const formatInlineStyles = (text) => {
    // Bold: **text** or __text__
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-accent-400">$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong class="font-bold text-accent-400">$1</strong>');
    
    // Italic: *text* or _text_
    text = text.replace(/\*(.+?)\*/g, '<em class="italic text-dark-muted">$1</em>');
    text = text.replace(/_(.+?)_/g, '<em class="italic text-dark-muted">$1</em>');
    
    // Inline code: `code`
    text = text.replace(/`(.+?)`/g, '<code class="bg-dark-bg px-2 py-1 rounded text-accent-400 font-mono text-sm">$1</code>');
    
    // Links: [text](url)
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent-500 hover:text-accent-400 underline">$1</a>');

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className={`formatted-content prose prose-invert max-w-none ${className}`}>
      <div className="bg-gradient-to-br from-dark-surface to-dark-bg rounded-xl p-8 shadow-dark-lg border border-dark-border">
        {formatContent(content)}
      </div>
    </div>
  );
};

export default FormattedContent;

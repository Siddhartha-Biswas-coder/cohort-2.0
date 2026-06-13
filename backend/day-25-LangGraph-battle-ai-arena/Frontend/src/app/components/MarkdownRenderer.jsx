import React from 'react';

const MarkdownRenderer = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block detection
    if (line.trim().startsWith('```')) {
      const lang = line.trim().replace('```', '').trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```

      elements.push(
        <div
          key={key++}
          className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden my-3 relative transition-colors"
        >
          {lang && (
            <div className="absolute top-0 right-0 bg-white dark:bg-[#030712] border-b border-l border-gray-200 dark:border-gray-800 px-2 py-0.5 rounded-bl-lg font-code text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-colors">
              {lang}
            </div>
          )}
          <pre className="font-code text-[13px] leading-relaxed p-4 overflow-x-auto text-gray-800 dark:text-gray-200 m-0 pt-6">
            <code>{highlightJS(codeLines.join('\n'))}</code>
          </pre>
        </div>
      );
      continue;
    }

    // H3 Header (### text)
    if (line.trim().startsWith('### ')) {
      elements.push(
        <h3
          key={key++}
          className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-4 mb-2 leading-snug"
        >
          {line.replace('### ', '').replace(/\*\*/g, '')}
        </h3>
      );
      i++;
      continue;
    }

    // Empty line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p
        key={key++}
        className="text-[14px] leading-relaxed text-gray-600 dark:text-gray-400 my-1.5"
        dangerouslySetInnerHTML={{
          __html: formatInlineCode(line),
        }}
      />
    );
    i++;
  }

  return <>{elements}</>;
};

function highlightJS(code) {
  const keywords = [
    'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while',
    'return', 'throw', 'new', 'try', 'catch', 'class', 'export',
    'import', 'default', 'typeof', 'instanceof',
  ];

  const lines = code.split('\n');

  return lines.map((line, lineIdx) => {
    const parts = [];
    let remaining = line;
    let partKey = 0;

    const commentIdx = remaining.indexOf('//');
    let commentPart = '';
    if (commentIdx >= 0) {
      commentPart = remaining.substring(commentIdx);
      remaining = remaining.substring(0, commentIdx);
    }

    const tokenRegex =
      /(\"[^\"]*\"|\'[^\']*\'|`[^`]*`|\b\d+n?\b|\b(?:function|const|let|var|if|else|for|while|return|throw|new|try|catch|class|export|import|default|typeof|instanceof|undefined|null|true|false)\b|[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()|[a-zA-Z_$][a-zA-Z0-9_$]*|[^\s\w]|\s+)/g;

    let match;
    while ((match = tokenRegex.exec(remaining)) !== null) {
      const token = match[0];

      if (/^["'`]/.test(token)) {
        parts.push(<span key={partKey++} className="token-string">{token}</span>);
      } else if (/^\d+n?$/.test(token)) {
        parts.push(<span key={partKey++} className="token-number">{token}</span>);
      } else if (
        keywords.includes(token) ||
        ['undefined', 'null', 'true', 'false'].includes(token)
      ) {
        parts.push(<span key={partKey++} className="token-keyword">{token}</span>);
      } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token)) {
        const afterIdx = tokenRegex.lastIndex;
        const after = remaining.substring(afterIdx).trimStart();
        if (after.startsWith('(')) {
          parts.push(<span key={partKey++} className="token-function">{token}</span>);
        } else if (
          token === 'Error' ||
          token === 'BigInt' ||
          token === 'Number' ||
          token === 'Math'
        ) {
          parts.push(<span key={partKey++} className="token-class-name">{token}</span>);
        } else {
          parts.push(<span key={partKey++}>{token}</span>);
        }
      } else if (/^[^\s\w]$/.test(token)) {
        parts.push(<span key={partKey++} className="token-operator">{token}</span>);
      } else {
        parts.push(<span key={partKey++}>{token}</span>);
      }
    }

    if (commentPart) {
      parts.push(<span key={partKey++} className="token-comment">{commentPart}</span>);
    }

    return (
      <span key={lineIdx}>
        {parts}
        {lineIdx < lines.length - 1 ? '\n' : ''}
      </span>
    );
  });
}

function formatInlineCode(text) {
  return text
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[12px] font-code text-gray-800 dark:text-gray-200 transition-colors">$1</code>'
    )
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>');
}

export default MarkdownRenderer;

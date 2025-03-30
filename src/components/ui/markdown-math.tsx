import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

// MathJax configuration
const mathJaxConfig = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
  },
  startup: {
    typeset: true,
  },
  chtml: {
    fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
  }
};

interface MarkdownMathProps {
  content: string;
  className?: string;
}

export const MarkdownMath: React.FC<MarkdownMathProps> = ({ content, className = '' }) => {
  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className={className}>
        <MathJax>
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </MathJax>
      </div>
    </MathJaxContext>
  );
};

import { convertFromHTML, convertToHTML } from 'draft-convert';

export const stateToHtml = convertToHTML({
  styleToHTML: (style) => {
    switch (style) {
      case 'BOLD':
        return <strong />;
      case 'ITALIC':
        return <em />;
      case 'UNDERLINE':
        return <span className="underline" style={{ textDecoration: 'underline' }} />;
      default:
        return null;
    }
  },
  blockToHTML: (block) => {
    switch (block.type) {
      case 'header-one':
        return <h1 />;
      case 'header-two':
        return <h2 />;
      case 'header-three':
        return <h3 />;
      case 'blockquote':
        return <blockquote />;
      case 'unordered-list-item':
        return {
          element: <li />,
          nest: <ul />,
        };
      case 'ordered-list-item':
        return {
          element: <li />,
          nest: <ol />,
        };
      case 'code-block':
        return <code />;
      case 'default':
        return <p />;
      default:
        return null;
    }
  },
});

export const htmlToState = convertFromHTML({
  htmlToStyle: (nodeName, node, currentStyle) => {
    if (nodeName === 'strong') {
      return currentStyle.add('BOLD');
    }
    if (nodeName === 'em') {
      return currentStyle.add('ITALIC');
    }
    if (nodeName === 'span' && node.classList.contains('underline')) {
      return currentStyle.add('UNDERLINE');
    }
    return currentStyle;
  },
  htmlToBlock(nodeName, node, last) {
    switch (nodeName) {
      case 'h1':
        return 'header-one';
      case 'h2':
        return 'header-two';
      case 'h3':
        return 'header-three';
      case 'blockquote':
        return 'blockquote';
      case 'li':
        if (last === 'ul') {
          return 'unordered-list-item';
        }
        return 'ordered-list-item';
      case 'code':
        return 'code-block';
      case 'div':
      case 'p':
        return 'default';
      default:
        return null;
    }
  },
});
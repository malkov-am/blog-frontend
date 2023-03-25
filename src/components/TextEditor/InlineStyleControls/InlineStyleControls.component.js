import React from 'react';
import StyleButton from '../StyleButton/StyleButton.component';
import './InlineStyleControls.styles.scss';

const InlineStyleControls = ({ onToggle }) => {
  const INLINE_STYLES = [
    { label: 'Жирный', style: 'BOLD' },
    { label: 'Курсив', style: 'ITALIC' },
    { label: 'Подчеркивание', style: 'UNDERLINE' },
  ];
  return (
    <div className="editor__controls-inline">
      {INLINE_STYLES.map(({ label, style }) => (
        <StyleButton key={label} label={label} onToggle={onToggle} style={style} />
      ))}
    </div>
  );
};

export default InlineStyleControls;

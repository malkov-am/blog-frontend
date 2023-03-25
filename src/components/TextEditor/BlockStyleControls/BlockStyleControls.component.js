import React from 'react';
import StyleButton from '../TextEditor/StyleButton/StyleButton.component';

const BlockStyleControls = ({ onToggle }) => {
  const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'Цитата', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Блок кода', style: 'code-block' },
  ];
  return (
    <div>
      {BLOCK_TYPES.map(({ label, style }) => (
        <StyleButton key={label} label={label} onToggle={onToggle} style={style} />
      ))}
    </div>
  );
};

export default BlockStyleControls;

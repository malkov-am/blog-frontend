import React from 'react';
import StyleButton from '../StyleButton/StyleButton.component';
import './BlockStyleControls.styles.scss';

const BlockStyleControls = ({ onToggle }) => {
  const BLOCK_TYPES = [
    { label: 'Заголовок 1 уровня', style: 'header-one' },
    { label: 'Заголовок 2 уровня', style: 'header-two' },
    { label: 'Заголовок 3 уровня', style: 'header-three' },
    { label: 'Цитата', style: 'blockquote' },
    { label: 'Маркированный список', style: 'unordered-list-item' },
    { label: 'Нумерованный список', style: 'ordered-list-item' },
    { label: 'Блок кода', style: 'code-block' },
  ];
  return (
    <div className="editor__controls-block">
      {BLOCK_TYPES.map(({ label, style }) => (
        <StyleButton key={label} label={label} onToggle={onToggle} style={style} />
      ))}
    </div>
  );
};

export default BlockStyleControls;

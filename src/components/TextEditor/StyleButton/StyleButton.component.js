import React from 'react';

const StyleButton = ({ onToggle, style, label }) => {
  const onClickButton = (evt) => {
    evt.preventDefault();
    onToggle(style);
  };
  return <button onMouseDown={onClickButton}>{label}</button>;
};

export default StyleButton;

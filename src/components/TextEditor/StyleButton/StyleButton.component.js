import clsx from 'clsx';
import React from 'react';
import './StyleButton.styles.scss';

const StyleButton = ({ onToggle, style, label }) => {
  const onClickButton = (evt) => {
    evt.preventDefault();
    onToggle(style);
  };
  return (
    <button
      title={label}
      className={clsx('editor__btn', `editor__btn_${style}`)}
      onMouseDown={onClickButton}
    />
  );
};

export default StyleButton;

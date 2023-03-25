import clsx from 'clsx';
import React from 'react';
import './Button.styles.scss';

export const BUTTON_TYPE_CLASSES = {
  sizeS: 'size-s',
  sizeL: 'size-l',
  link: 'link',
};

const Button = ({ buttonType, isDisabled, children, ...otherProps }) => {
  return (
    <button
      className={clsx('button', `button_type_${buttonType}`, isDisabled && `button_disabled`)}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;

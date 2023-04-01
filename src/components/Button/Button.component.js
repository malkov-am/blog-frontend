/**
 * @module Button
 */
import clsx from 'clsx';
import React from 'react';
import Spinner from '../Spinner/Spinner';
import './Button.styles.scss';

export const BUTTON_TYPE_CLASSES = {
  sizeS: 'size-s',
  sizeL: 'size-l',
  sizeLTransparent: 'size-l-transparent',
  link: 'link',
  pen: 'pen',
  trash: 'trash',
  close: 'close',
};

const Button = ({ buttonType, isDisabled, isLoading, children, ...otherProps }) => {
  return (
    <button
      className={clsx(
        'button',
        `button_type_${buttonType}`,
        isDisabled && `button_disabled`,
        isLoading && `button_disabled`,
      )}
      {...otherProps}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;

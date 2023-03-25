import React from 'react';
import './SignForm.styles.scss';

const SignForm = ({ title, children }) => {
  return (
    <div className="sign">
      <h2 className="sign__title">{title}</h2>
      <form className="sign__form" noValidate>
        {children}
      </form>
    </div>
  );
};

export default SignForm;

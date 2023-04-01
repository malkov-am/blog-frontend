/**
 * @module Login
 */
import React, { useEffect } from 'react';
import SignForm from '../SignForm/SignForm.component';
import { Navigate, useNavigate } from 'react-router-dom';
import useValidation from '../../hooks/useValidation';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../utils/constants';
import Button, { BUTTON_TYPE_CLASSES } from '../Button/Button.component';

const Login = ({ onLogin, isLoggedIn, isLoading }) => {
  const navigate = useNavigate();
  // Валидация формы
  const { values, errors, isValid, handleChange, resetForms } = useValidation('.sign__form');
  // Сброс полей формы при открытии
  useEffect(() => {
    resetForms();
  }, [resetForms]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin({ email: values.email, password: values.password });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <SignForm title="Рады видеть!">
      <div>
        <label htmlFor="email" className="sign__form-label">
          E-mail
        </label>
        <input
          name="email"
          id="email"
          className="sign__form-input"
          type="email"
          required
          onChange={handleChange}
          value={values.email || ''}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        />
        <p className="sign__form-err-message">{errors.email}</p>
        <label htmlFor="password" className="sign__form-label">
          Пароль
        </label>
        <input
          name="password"
          id="password"
          className="sign__form-input"
          type="password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          maxLength={PASSWORD_MAX_LENGTH}
          onChange={handleChange}
          value={values.password || ''}
        />
        <p className="sign__form-err-message">{errors.password}</p>
      </div>
      <div className="sign__form-buttons">
        <Button
          buttonType={BUTTON_TYPE_CLASSES.sizeL}
          type="submit"
          isDisabled={!isValid}
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Войти
        </Button>
        <p className="sign__form-invite">
          Ещё не зарегистрированы?
          <Button buttonType={BUTTON_TYPE_CLASSES.link} onClick={() => navigate('/signup')}>
            Регистрация
          </Button>
        </p>
      </div>
    </SignForm>
  );
};

export default Login;

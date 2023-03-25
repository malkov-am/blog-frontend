import React, { useEffect } from 'react';
import SignForm from '../SignForm/SignForm.component';
import { Link, Navigate } from 'react-router-dom';
import useValidation from '../../hooks/useValidation';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../utils/constants';

const Login = ({ onLogin, isLoggedIn }) => {
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
        <button
          className="sign__form-btn"
          type="submit"
          isDisabled={!isValid}
          onClick={handleSubmit}
        >
          Войти
        </button>
        <p className="sign__form-invite">
          Ещё не зарегистрированы?
          <Link className="sign__form-link" to="/signup">
            Регистрация
          </Link>
        </p>
      </div>
    </SignForm>
  );
};

export default Login;

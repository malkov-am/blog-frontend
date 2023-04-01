/**
 * @module Header
 */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Button, { BUTTON_TYPE_CLASSES } from '../Button/Button.component';
import './Header.styles.scss';

const Header = ({ isLoggedIn, onLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  const { name } = currentUser;
  const navigate = useNavigate();

  const logout = () => {
    onLogout();
  };

  return (
    <header className="header">
      <Link to="/" title="Домой" className="header__logo" />
      <div className="header__wrapper">
        {isLoggedIn && <p className="header__username">{name}</p>}
        {isLoggedIn ? (
          <Button buttonType={BUTTON_TYPE_CLASSES.sizeS} onClick={logout}>
            Выход
          </Button>
        ) : (
          <>
            <Button buttonType={BUTTON_TYPE_CLASSES.sizeS} onClick={() => navigate('/signup')}>
              Регистрация
            </Button>
            <Button buttonType={BUTTON_TYPE_CLASSES.sizeS} onClick={() => navigate('/signin')}>
              Вход
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button, { BUTTON_TYPE_CLASSES } from '../Button/Button.component';
import './Header.styles.scss';

const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <Link to="/" title="Домой" className="header__logo" />
      <div className="header__wrapper">
        {isLoggedIn && <p className="header__username">Андрей</p>}
        {isLoggedIn ? (
          <Button buttonType={BUTTON_TYPE_CLASSES.sizeS}>Выход</Button>
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

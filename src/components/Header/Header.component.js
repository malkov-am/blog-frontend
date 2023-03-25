import React from 'react';
import { Link } from 'react-router-dom';
import './Header.styles.scss';

const Header = () => {
  const isLoggedIn = false;
  return (
    <header className="header">
      <Link to="/" title="Домой" className="header__logo" />
      <div className="header__wrapper">
        {isLoggedIn && <p className="header__username">Андрей</p>}
        {isLoggedIn ? (
          <button className="header__sign-btn">Выход</button>
        ) : (
          <>
            <Link to="/signup" className="header__sign-btn">
              Регистрация
            </Link>
            <Link to="signin" className="header__sign-btn">
              Вход
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

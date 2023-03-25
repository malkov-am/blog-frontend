import React from 'react';
import './Header.styles.scss';

const Header = () => {
  const isLoggedIn = false;
  return (
    <header className="header">
      <button title="Домой" className="header__logo" />
      <div className="header__wrapper">
        {isLoggedIn && <p className="header__username">Андрей</p>}
        {isLoggedIn ? (
          <button className="header__sign-btn">Выход</button>
        ) : (
          <>
            <button className="header__sign-btn">Регистрация</button>
            <button className="header__sign-btn">Вход</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

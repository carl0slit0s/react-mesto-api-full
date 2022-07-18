import React from 'react';
import { Switch } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';
import logo from '../images/vector_img/logo.svg';

export default function Header({ handleOut, userData }) {
  return (
    <header className='header'>
      <img
        src={logo}
        alt="лого сайта. Надпись на английском языке 'место'"
        className='header__logo'
      />
      <Switch>
        <Route path={'/signup'}>
          <Link className='link' to='/signin'>
            Войти
          </Link>
        </Route>
        <Route path={'/signin'}>
          <Link className='link' to='/signup'>
            Регистрация
          </Link>
        </Route>
        <Route exact path={'/'}>
          <div className='header__bar'>
            <p>{userData.email}</p>
            <Link className='link' onClick={handleOut} to='/signin'>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

import React from 'react';

import logo from '../images/vector_img/logo.svg';

export default function Header() {
  return (
    <header className='header'>
      <img
        src={logo}
        alt="лого сайта. Надпись на английском языке 'место'"
        className='header__logo'
      />
    </header>
  );
}

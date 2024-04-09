import React from 'react';

const Header = () => {
    return (
        <div className='pt-4 mb-4 text-center'>
        <img  src={window.location.origin + `/images/blink-logo.svg`}data="blink-logo"  alt="Blink Logo"></img>
               <h1>Blink Demo Invoice Manager</h1>
        </div>
    );
};

export default Header;
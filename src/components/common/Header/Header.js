import React from 'react';
import './Header.scss';
import icon from '../../../asset/SBA-icon.png';

const Header = () => {
    return(
      <header>
          <div>
              <img src={icon} width={90} height={80}/>
              <h2>Seed Gameboy Advance</h2>
          </div>
      </header>
    );
};

export default Header;
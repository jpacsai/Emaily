import React from 'react';

class Header extends React.Component {
  render () {
    return (
      <nav className="nav-wrapper">
        <a className="left brand-logo" href="#">Emaily</a>
        <ul className="right">
          <li>
            <a href="#">Log in with Google</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Header;
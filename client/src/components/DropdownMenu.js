import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { paths } from './../config';

import './DropdownMenu.scss';

const DropdownMenu = ({ onClose }) => {
  const node = useRef();

  useEffect(() => {
    const handleClick = event => {
      if (event.target.id === 'menu-wrapper') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onClose]);

  const component = (
    <div className="DropdownMenu">
      <div id="menu-wrapper" className="wrapper" ref={node}>
        <ul className="dropdown-menu">
          <li>
            <Link to={paths.SETTINGS} onClick={onClose}>
              <span>Settings</span>
            </Link>
          </li>
          <li className="divider" />
          <li>
            <a href="/api/logout" onClick={onClose}>
              <span>Log out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );

  return ReactDOM.createPortal(component, document.getElementById('dropdown-menu'));
};

export default DropdownMenu;

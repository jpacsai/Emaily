import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import classnames from 'classnames';

import './Link.scss';

const Link = ({ to, className, disabled, children }) => {
  return (
    <RouterLink to={to} className={classnames('Link', className, disabled && 'disabled')}>
      {children}
    </RouterLink>
  );
};

export default Link;
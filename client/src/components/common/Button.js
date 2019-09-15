import React from 'react';
import classnames from 'classnames';

import './Button.scss';

const Button = ({ className, icon, alignIconRight, disabled, children }) => {
  return (
    <button className={classnames('Button', className, disabled && 'disabled')}>
      {icon && !alignIconRight && <i className={classnames('material-icons', 'align-icon-left')}>{icon}</i>}
      <span>{children}</span>
      {icon && alignIconRight && <i className={classnames('material-icons', 'align-icon-right')}>{icon}</i>}
    </button>
  );
};

export default Button;
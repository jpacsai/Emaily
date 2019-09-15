import React from 'react';
import classnames from 'classnames';
import './Page.scss';

const Page = ({className, children}) => {
  return (
    <div className={classnames('page', className)}>
      {children}
    </div>
  );
};

export default Page;

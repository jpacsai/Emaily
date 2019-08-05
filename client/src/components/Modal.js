import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './Modal.scss';

const Modal = ({ children, className, onClose, isOpen, title }) => {
  useEffect(() => {
    const handleClick = event => {
      if (event.target.id === 'modal-wrapper') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const component = (
    <div className="Modal">
      <div id="modal-wrapper" className="wrapper">
      <div className={classnames('card', className)}>
          <div className="card-content">
            <header className="card-title">
              {!!title && title}
              <i className="material-icons right" onClick={onClose}>
                close
              </i>
            </header>

            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(component, document.getElementById('modal'));
};

export default Modal;

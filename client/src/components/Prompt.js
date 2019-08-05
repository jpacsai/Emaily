import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './Prompt.scss';

const Prompt = ({ children, className, isOpen, onSubmit, submitLabel, onCancel, cancelLabel, title }) => {
  if (!isOpen) return null;

  const component = (
    <div className="Prompt-container">
      <div className={classnames('Prompt', 'card', className)}>
        <div className="card-content">

          <header className="card-title">
            {!!title && title}
            {!onSubmit && <i className="material-icons right" onClick={onCancel}>close</i>}
          </header>

          <main>{children}</main>

          {!!onSubmit && (
            <footer className="card-action">
              <button className="btn white-text left" onClick={onCancel}>
                {cancelLabel || 'Cancel'}
              </button>
              
              <button className="btn red white-text right" onClick={onSubmit}>
                {submitLabel || 'Submit'}
              </button>
            </footer>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(component, document.getElementById('prompt'));
};

export default Prompt;

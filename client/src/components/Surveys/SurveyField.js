import React from 'react';
// import { reduxForm, Field } from 'redux-form';

const SurveyField = ({ input, label, meta }) => {
  const { error, touched } = meta;
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '0.25rem'}}/>
      <p className="red-text" style={{ margin: '0 0 1.5rem'}}>
        {touched && error}
      </p>
      
    </div>
  )
}

export default SurveyField;

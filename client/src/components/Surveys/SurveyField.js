import React from 'react';
// import { reduxForm, Field } from 'redux-form';

const SurveyField = ({ input, label, meta }) => {
  const { error, touched } = meta;
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      {touched && error}
    </div>
  )
}

export default SurveyField;

import React from 'react';
// import { reduxForm, Field } from 'redux-form';

const SurveyField = ({ input, label}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  )
}

export default SurveyField;

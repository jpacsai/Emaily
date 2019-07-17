import React from 'react';
import { connect } from 'react-redux';
import { formFields } from './../../config';

const mapStateToProps = state => ({
  formValues: state.form.surveyForm.values
});

const SurveyFormReview = ({ onCancel, formValues }) => {
  return (
    <div>
      <h5>Please check your details</h5>
      { formFields.map(({ label, name}) => (
        <div key={name}>
          <label>{label}</label>
          <p>{formValues[name]}</p>
        </div>
      )) }

      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
    </div>
  );
};

export default connect(mapStateToProps)(SurveyFormReview);

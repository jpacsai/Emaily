import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { formFields } from './../../config';
import { submitSurvey } from '../../store/actions';

const mapStateToProps = state => ({
  formValues: state.form.surveyForm.values
});

const mapDispatchToProps = { submitSurvey };

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  return (
    <div>
      <h5>Please check your details</h5>

      { formFields.map(({ label, name}) => (
        <div key={name}>
          <label>{label}</label>
          <p>{formValues[name]}</p>
        </div>
      )) }

      <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
        Back
      </button>

      <button className="green white-text btn-flat right" onClick={() => submitSurvey(formValues, history)}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SurveyFormReview));

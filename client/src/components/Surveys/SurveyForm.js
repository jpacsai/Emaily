import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { paths, formFields } from './../../config';

import SurveyField from './SurveyField';

class SurveyForm extends React.Component {
  renderFields() {
    return formFields.map(({ label, name }, i) => (
      <Field key={i} type="text" name={name} component={SurveyField} label={label} />
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to={paths.SURVEYS} className="red btn-flat left white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = formFields.reduce(
    (total, field) => {
      // if validation function is declared use that
      if (field.validation && values[field.name]) {
        const error = field.validation(values[field.name]);
        return error ? { ...total, [field.name]: error } : total;
      }
      // else check if field is not empty
      return !values[field.name]
        ? { ...total, [field.name]: `You must provide ${field.name}!` }
        : total
    },
    {}
  );
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);

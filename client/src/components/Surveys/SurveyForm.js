import React from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

const FIELDS = [
  { label: "Survey Title", name: "title"},
  { label: "Subject Line", name: "subject"},
  { label: "Email body", name: "body"},
  { label: "Recipient List", name: "emails"}
];

class SurveyForm extends React.Component {
  renderFields() {
    return (
      FIELDS.map(({ label, name }, i) => 
        <Field key={i} type="text" name={name} component={SurveyField} label={label} />
      )
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(res => console.log(res))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }  
}

export default reduxForm({ form: 'surveyForm '})(SurveyForm);

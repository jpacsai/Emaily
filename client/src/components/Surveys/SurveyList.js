import React from 'react';
import { connect } from 'react-redux';
import { getSurveys } from './../../store/selectors';
import { fetchSurveys, deleteSurvey } from '../../store/actions';

import DeleteSurveyPrompt from './DeleteSurveyPrompt';

const mapStateToProps = state => ({
  surveys: getSurveys(state)
});

const mapDispatchToProps = { fetchSurveys, deleteSurvey };

class SurveyList extends React.Component {
  state = {
    isPromptOpen: false,
    deleteSurveyId: null
  };

  componentDidMount() {
    this.props.fetchSurveys();
  }

  openPrompt = surveyId => {
    this.setState(state => ({ isPromptOpen: !state.isPromptOpen, deleteSurveyId: surveyId }));
  };

  closePrompt = () => {
    this.setState({ isPromptOpen: false, deleteSurveyId: null });
  };

  handleDelete = () => {
    const { deleteSurveyId } = this.state;
    this.closePrompt();
    this.props.deleteSurvey(deleteSurveyId);
  };

  getSurveyTitle = () => {
    const survey = this.props.surveys.find(survey => survey._id === this.state.deleteSurveyId);
    return survey ? survey.title : '';
  };

  renderSurveys() {
    const surveys = [...this.props.surveys].reverse();
    return surveys.map((survey, i) => (
      <div key={i} className="card red lighten-5">
        <div className="card-action right">
          <button className="btn-flat red white-text" onClick={() => this.openPrompt(survey._id)}>
            Delete<i className="material-icons right">delete</i>
          </button>
        </div>

        <div className="card-content">
          <span className="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <p className="right">Sent on: {new Date(survey.date_sent).toLocaleDateString()}</p>
        </div>
        
        <div className="card-action">
          <p>Yes: {survey.yes}</p>
          <p>No: {survey.no}</p>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
        <DeleteSurveyPrompt
          isOpen={this.state.isPromptOpen}
          onSubmit={this.handleDelete}
          onCancel={this.closePrompt}
          surveyTitle={this.getSurveyTitle()}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyList);

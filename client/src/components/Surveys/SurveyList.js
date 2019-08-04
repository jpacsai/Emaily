import React from 'react';
import { connect } from 'react-redux';
import { getSurveys } from './../../store/selectors';
import { fetchSurveys, deleteSurvey } from '../../store/actions';

import DeleteSurveyPrompt from './DeleteSurveyPrompt';
import SurveyResultPrompt from './SurveyResultPrompt';

import './SurveyList.scss';

const mapStateToProps = state => ({
  surveys: getSurveys(state)
});

const mapDispatchToProps = { fetchSurveys, deleteSurvey };

class SurveyList extends React.Component {
  state = {
    promptOpen: null,
    promptSurveyId: null
  };

  componentDidMount() {
    this.props.fetchSurveys();
  }

  openPrompt = (type, surveyId) => {
    this.setState(state => ({ promptOpen: type, promptSurveyId: surveyId }));
  };

  closePrompt = () => {
    this.setState({ promptOpen: null, promptSurveyId: null });
  };

  handleDelete = () => {
    const { promptSurveyId } = this.state;
    this.closePrompt();
    this.props.deleteSurvey(promptSurveyId);
  };

  getSurveyTitle = () => {
    const survey = this.props.surveys.find(survey => survey._id === this.state.promptSurveyId);
    return survey ? survey.title : '';
  };

  renderSurveys() {
    const surveys = [...this.props.surveys].reverse();
    return surveys.map((survey, i) => (
      <div key={i} className="card red lighten-5">
        <div className="card-action right">
          <button className="btn-flat red white-text" onClick={() => this.openPrompt('delete', survey._id)}>
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
          <button className="btn-flat cyan darken-1 white-text" onClick={() => this.openPrompt('results', survey._id)}>
            Results<i className="material-icons right">pie_chart</i>
          </button>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="SurveyList">
        {this.renderSurveys()}
        <DeleteSurveyPrompt
          isOpen={this.state.promptOpen === 'delete'}
          onSubmit={this.handleDelete}
          onCancel={this.closePrompt}
          surveyTitle={this.getSurveyTitle()}
        />
        <SurveyResultPrompt
          isOpen={this.state.promptOpen === 'results'}
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

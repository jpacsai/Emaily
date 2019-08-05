import React from 'react';
import { connect } from 'react-redux';
import { getSurveys } from './../../store/selectors';
import { fetchSurveys, deleteSurvey } from '../../store/actions';

import DeleteSurveyPrompt from './DeleteSurveyPrompt';
import SurveyResultModal from './SurveyResultModal';
import SurveyListItem from './SurveyListItem';

import './SurveyList.scss';

const mapStateToProps = state => ({
  surveys: getSurveys(state)
});

const mapDispatchToProps = { fetchSurveys, deleteSurvey };

class SurveyList extends React.Component {
  state = {
    isOpenModalPrompt: null,
    openSurveyId: null
  };

  componentDidMount() {
    this.props.fetchSurveys();
  }

  openPrompt = (type, surveyId) => {
    this.setState(state => ({ isOpenModalPrompt: type, openSurveyId: surveyId }));
  };

  closePrompt = () => {
    this.setState({ isOpenModalPrompt: null, openSurveyId: null });
  };

  handleDelete = () => {
    const { openSurveyId } = this.state;
    this.closePrompt();
    this.props.deleteSurvey(openSurveyId);
  };

  getSurveyTitle = () => {
    const survey = this.props.surveys.find(survey => survey.id === this.state.openSurveyId);
    return survey ? survey.title : '';
  };

  render() {
    const surveys = [...this.props.surveys].reverse();
    return (
      <div className="SurveyList">
        {surveys.map((survey, i) => (
          <SurveyListItem survey={survey} openPrompt={this.openPrompt} key={i} />
        ))}

        <DeleteSurveyPrompt
          isOpen={this.state.isOpenModalPrompt === 'delete'}
          onSubmit={this.handleDelete}
          onCancel={this.closePrompt}
          surveyTitle={this.getSurveyTitle()}
        />
        <SurveyResultModal
          isOpen={this.state.isOpenModalPrompt === 'results'}
          onSubmit={this.handleDelete}
          onCancel={this.closePrompt}
          surveyTitle={this.getSurveyTitle()}
          id={this.state.openSurveyId}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyList);

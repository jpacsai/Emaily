import React from 'react';
import { connect } from 'react-redux';
import { surveySortOptions } from '../../config';
import { getSurveys, getSurveySortBySettings } from './../../store/selectors';
import { fetchSurveys, deleteSurvey, resolveSortBy } from '../../store/actions';

import DeleteSurveyPrompt from './DeleteSurveyPrompt';
import SurveyResultModal from './SurveyResultModal';
import SurveyListItem from './SurveyListItem';
import SortBy from './../common/SortBy';

import './SurveyList.scss';

const mapStateToProps = state => ({
  surveys: getSurveys(state),
  sortBySettings: getSurveySortBySettings(state)
});

const mapDispatchToProps = { fetchSurveys, deleteSurvey, resolveSortBy };

class SurveyList extends React.Component {
  state = {
    isOpenModalPrompt: null,
    openSurveyId: null
  };

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

  handleSortByChange = value => {
    this.props.resolveSortBy(value);
  };

  getSurveyTitle = () => {
    const survey = this.props.surveys.find(survey => survey.id === this.state.openSurveyId);
    return survey ? survey.title : '';
  };

  getSortedSurveys = () => {
    const { surveys, sortBySettings } = this.props;
    switch (sortBySettings) {
      case 'oldest':
        return surveys.sort((a, b) => new Date(a.date_sent) - new Date(b.date_sent));
      case 'answeredLow':
        return surveys.sort((a, b) => (a.yes + a.no) / a.recipients - (b.yes + b.no) / b.recipients);
      case 'answeredHigh':
        return surveys.sort((a, b) => (b.yes + b.no) / b.recipients - (a.yes + a.no) / a.recipients);
      default:
        return surveys.sort((a, b) => new Date(b.date_sent) - new Date(a.date_sent));
    }
  };

  render() {
    const surveys = this.getSortedSurveys();
    if (!surveys) return null;
    return (
      <div className="SurveyList">
        <header>
          <SortBy
            options={surveySortOptions}
            defaultValue={this.props.sortBySettings}
            onChange={this.handleSortByChange}
          />
        </header>
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

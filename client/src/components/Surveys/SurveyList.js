import React from 'react';
import { connect } from 'react-redux';
import { surveySortOptions, surveyFilterOptions } from '../../config';
import { getSurveys, getSurveySortBySettings, getSurveyFilterSettings } from './../../store/selectors';
import { fetchSurveys, deleteSurvey, updateSortBy, updateFilter } from '../../store/actions';

import DeleteSurveyPrompt from './DeleteSurveyPrompt';
import SurveyResultModal from './SurveyResultModal';
import SurveyListItem from './SurveyListItem';
import Select from './../common/Select';

import './SurveyList.scss';

const mapStateToProps = state => ({
  surveys: getSurveys(state),
  sortBySettings: getSurveySortBySettings(state),
  filterSettings: getSurveyFilterSettings(state)
});

const mapDispatchToProps = { fetchSurveys, deleteSurvey, updateSortBy, updateFilter };

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
    this.props.updateSortBy(value);
  };

  handleFilterChange = value => {
    this.props.updateFilter(value);
  };
  
  getSurveyTitle = () => {
    const survey = this.props.surveys.find(survey => survey.id === this.state.openSurveyId);
    return survey ? survey.title : '';
  };
  
  getFilteredSurveys = () => {
    const { surveys, filterSettings } = this.props;
    switch (filterSettings) {
      case 'hasResult':
        return surveys.filter(({ yes, no }) => yes + no > 0);
      case 'noResult':
        return surveys.filter(({ yes, no }) => yes + no === 0);
      case 'moreYes':
        return surveys.filter(({ yes, no }) => yes > no);
      case 'moreNo':
        return surveys.filter(({ yes, no }) => yes < no);
      case 'equal':
        return surveys.filter(({ yes, no }) => yes + no > 0 && yes === no);
      default:
        return surveys;
    }
  };

  getSortedSurveys = (surveys) => {
    const { sortBySettings } = this.props;
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

  getSurveysFilteredSorted = () => {
    const filteredSurveys = this.getFilteredSurveys();
    const sortedFilteredSurveys = this.getSortedSurveys(filteredSurveys);
    return sortedFilteredSurveys;
  }

  render() {
    const surveys = this.getSurveysFilteredSorted();
    if (!surveys) return null;
    const { sortBySettings, filterSettings } = this.props;
    return (
      <div className="SurveyList">
        <header>
          <Select
            options={surveySortOptions}
            defaultValue={sortBySettings}
            onChange={this.handleSortByChange}
            text="Sort by:"
          />
          <Select
            options={surveyFilterOptions}
            defaultValue={filterSettings}
            onChange={this.handleFilterChange}
            text="Filter:"
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

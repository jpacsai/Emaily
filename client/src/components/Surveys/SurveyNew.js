import React from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends React.Component {
  state = {
    showReview: false
  };

  toggleShowReview = () => {
    this.setState({ showReview: true });
  };

  renderContent() {
    return (
      this.state.showReview ?
        <SurveyFormReview /> :
        <SurveyForm onSurveySubmit={this.toggleShowReview} />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default SurveyNew;

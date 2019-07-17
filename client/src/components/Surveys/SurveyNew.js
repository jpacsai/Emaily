import React from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends React.Component {
  state = {
    showReview: false
  };

  toggleShowReview = () => {
    this.setState({ showReview: !this.state.showReview });
  };

  renderContent() {
    return (
      this.state.showReview ?
        <SurveyFormReview onCancel={this.toggleShowReview}/> :
        <SurveyForm onSurveySubmit={this.toggleShowReview} />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default SurveyNew;

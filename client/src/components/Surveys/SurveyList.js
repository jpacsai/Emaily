import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../store/actions';

const mapStateToProps = ({ surveys }) => ({
  surveys
});

const mapDispatchToProps = { fetchSurveys };

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    const surveys = [...this.props.surveys].reverse();
    return (
      surveys.map((survey, i) => (
        <div key={i} className="card teal lighten-5">
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent on: { new Date(survey.date_sent).toLocaleDateString() }
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      ))
    )
  }

  render() {
    return (
      <div>
        { this.renderSurveys() }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyList);

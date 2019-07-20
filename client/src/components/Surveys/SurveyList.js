import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../store/actions';
import { getSurveys } from './../../store/selectors';

const mapStateToProps = (state) => ({
  surveys: getSurveys(state)
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
        <div key={i} className="card red lighten-5">
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
            <p>Yes: {survey.yes}</p>
            <p>No: {survey.no}</p>
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

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { paths } from '../config';
import { getMyCredits } from '../store/selectors';

import SurveyList from './Surveys/SurveyList';
import './Dashboard.scss';

const mapStateToProps = (state) => ({
  credit: getMyCredits(state)
});

const Dashboard = ({ credit }) => {
  return (
    <div className="Dashboard">
      <header>
        <h2>Dashboard</h2>
        <Link to={paths.NEW_SURVEY} className={classnames("btn-floating btn-large", credit ? "red" : "grey disabled")}>
          <i className="large material-icons">add</i>
        </Link>
      </header>
      <SurveyList />
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(Dashboard);

import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from './../config';

import SurveyList from './Surveys/SurveyList';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to={paths.NEW_SURVEYS} className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

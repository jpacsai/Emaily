import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from './../config';

import SurveyList from './Surveys/SurveyList';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <header>
        <h2>Dashboard</h2>
        <Link to={paths.NEW_SURVEYS} className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </header>
      <SurveyList />
    </div>
  );
};

export default Dashboard;

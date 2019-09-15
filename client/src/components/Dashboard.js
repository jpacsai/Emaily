import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { paths } from '../config';
import { getMyCredits } from '../store/selectors';

import Page from './common/Page';
import Link from './common/Link';
import Button from './common/Button';
import SurveyList from './Surveys/SurveyList';
import './Dashboard.scss';

const mapStateToProps = (state) => ({
  credit: getMyCredits(state)
});

const Dashboard = ({ credit }) => {
  const hasNoCredit = credit === 0;
  return (
    <Page className='Dashboard'>
      <header>
        <Link to={paths.NEW_SURVEY} disabled={hasNoCredit} >
          <Button icon='add' className={classnames(hasNoCredit && 'disabled')}>
            Add survey
          </Button>
        </Link>
      </header>
      <SurveyList />
    </Page>
  );
};

export default connect(
  mapStateToProps,
  null
)(Dashboard);

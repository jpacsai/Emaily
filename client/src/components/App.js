import React from 'react';
import socketIOClient  from 'socket.io-client';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { paths } from './../config';
import { fetchUser, resolveSurvey } from './../store/actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './Surveys/SurveyNew';


const mapDispatchToProps = { fetchUser, resolveSurvey };

class App extends React.Component {
  state = {
    endpoint: process.env.URL
  }

  componentDidMount() {
    this.props.fetchUser();

    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("refreshSurvey", survey => {
      if (survey) this.props.resolveSurvey(survey);
    });
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path={paths.SURVEYS} component={Dashboard} />
          <Route path={paths.NEW_SURVEYS} component={SurveyNew} />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);

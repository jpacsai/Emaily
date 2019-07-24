import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { paths } from './../config';
import { fetchInitData } from './../store/actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './Surveys/SurveyNew';
import Settings from './Settings';

const mapDispatchToProps = { fetchInitData };

class App extends React.Component {
  componentDidMount() {
    this.props.fetchInitData();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path={paths.SURVEYS} component={Dashboard} />
          <Route path={paths.NEW_SURVEYS} component={SurveyNew} />
          <Route path={paths.SETTINGS} component={Settings} />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);

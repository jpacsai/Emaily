import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { paths } from './../config';
import { fetchUser } from './../store/actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';

const SurveyNew = () => <h2>SurveyNew</h2>;

const mapDispatchToProps = { fetchUser };

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
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

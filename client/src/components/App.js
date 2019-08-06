import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from '../config';
import { fetchInitData } from '../store/actions';
import { getLoggedInStatus } from '../store/selectors';

import Header from './Header';
import NotFoundPage from './NotFoundPage';

const mapStateToProps = state => ({
  isLoggedIn: getLoggedInStatus(state)
});

const mapDispatchToProps = { fetchInitData };

class App extends React.Component {
  componentDidMount() {
    this.props.fetchInitData();
  }

  renderRoute(props) {
    const { isLoggedIn } = this.props;
    const path = props.match.path;
    const route = routes.find(route => route.path === path);
    if (!route) return null;
    const { auth, component: Component } = route;
    return auth && !isLoggedIn ? <h2>Please sign in</h2> : <Component />;
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Switch>
            {routes.map(({ path, exact }) => (
              <Route key={path} exact={exact} path={path} render={props => this.renderRoute(props)} />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from '../config';
import { fetchInitData } from '../store/actions';
import { getLoggedInStatus } from '../store/selectors';

import Navbar from './layout/Navbar';
import NotFoundPage from './NotFoundPage';

import './App.scss';

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
    if (route === false) return null;
    const { auth, component: Component } = route;
    return auth && isLoggedIn === false ? <h2>Please sign in</h2> : <Component />;
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <main>
            <Switch>
              {routes.map(({ path, exact }) => (
                <Route key={path} exact={exact} path={path} render={props => this.renderRoute(props)} />
              ))}
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

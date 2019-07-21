import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMe } from '../store/selectors';

import StripeContainer from './StripeContainer';

const mapStateToProps = state => ({
  me: getMe(state)
});

class Header extends React.Component {
  renderContent = () => {
    const { me } = this.props;
    switch (me) {
      case null:
        return null;
      case false:
        return (
          <li>
            <a href="/auth/google">Log in with Google</a>
          </li>
        );
      default:
        return (
          <Fragment>
            <li>
              <StripeContainer />
            </li>
            <li style={{ margin: '0 10px' }}>
              Credits: { me.credits }
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </Fragment>
        );
    }
  };

  render() {
    const { me } = this.props;
    return (
      <nav className="nav-wrapper">
        <Link to={ !!me ? '/surveys' : '/' } className="left brand-logo">
          Emaily
        </Link>
        <ul className="right">{this.renderContent()}</ul>
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Header);

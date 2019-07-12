import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import StripeContainer from './StripeContainer';

const mapStateToProps = ({ auth }) => ({
  auth
});

class Header extends React.Component {
  renderContent = () => {
    switch (this.props.auth) {
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
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </Fragment>
        );
    }
  };

  render() {
    const { auth } = this.props;
    return (
      <nav className="nav-wrapper">
        <Link to={auth ? '/surveys' : '/'} className="left brand-logo">
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

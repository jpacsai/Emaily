import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = ({ auth }) => ({
  auth
});

class Header extends React.Component {
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return null;
      case false:
        return <a href="/auth/google">Log in with Google</a>;
      default:
        return <a href="/api/logout">Logout</a>;
    }
  };

  render() {
    const { auth } = this.props;
    return (
      <nav className="nav-wrapper">
        <Link to={ auth ? '/surveys' : '/'} className="left brand-logo">
          Emaily
        </Link>
        <ul className="right">
          <li>{this.renderContent()}</li>
        </ul>
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Header);

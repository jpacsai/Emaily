import React from 'react';
import { connect } from 'react-redux';

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
        return <a>Logout</a>;
    }
  };

  render() {
    return (
      <nav className="nav-wrapper">
        <a className="left brand-logo">
          Emaily
        </a>
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

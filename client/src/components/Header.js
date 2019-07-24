import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMe } from '../store/selectors';

import StripeContainer from './StripeContainer';
import DropdownMenu from './DropdownMenu';
import './Header.scss';

const mapStateToProps = state => ({
  me: getMe(state)
});

class Header extends React.Component {
  state = {
    menuOpen: false
  };

  handleToggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  };

  renderContent = () => {
    const { me } = this.props;
    const { menuOpen } = this.state;

    return !me ? null : (
      <Fragment>
        <li>
          <StripeContainer />
        </li>
        <li className="credits">Credits: {me.credits}</li>
        <li className="dropdown">
          <a className="dropdown-trigger" href="#!" onClick={this.handleToggleMenu}>
            <i className="material-icons right">settings</i>
          </a>
        </li>
        {menuOpen && <DropdownMenu onClose={this.handleToggleMenu} />}
      </Fragment>
    );
  };

  render() {
    const { me } = this.props;
    
    return (
      <nav className="Header nav-wrapper">
        <Link to={!!me ? '/surveys' : '/'} className="left brand-logo">
          Emaily
        </Link>
        <ul className="right nav-list">{this.renderContent()}</ul>
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Header);

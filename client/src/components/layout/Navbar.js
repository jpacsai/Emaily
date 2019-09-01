import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMe } from '../../store/selectors';

import StripeContainer from '../StripeContainer';
import DropdownMenu from '../DropdownMenu';
import './Navbar.scss';

const mapStateToProps = state => ({
  me: getMe(state)
});

class Navbar extends React.Component {
  state = {
    menuOpen: false
  };

  handleToggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  renderContent = () => {
    const { me } = this.props;

    return !me ? null : (
      <Fragment>
        <li className="credits">Credits: {me.credits}</li>
        <li>
          <StripeContainer />
        </li>
      </Fragment>
    );
  };

  render() {
    const { me } = this.props;
    const { menuOpen } = this.state;
    return (
      <nav className="Navbar nav-wrapper white">
        <Link to={!!me ? '/surveys' : '/'} className="brand-logo">
          Emaily.
        </Link>
        <ul className="right nav-list">{this.renderContent()}</ul>
        <div className="dropdown" onClick={this.handleToggleMenu}>
          <i className="material-icons right">more_vert</i>
        </div>
        {menuOpen && <DropdownMenu onClose={this.handleToggleMenu} className="dropdown" />}
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Navbar);

import React from 'react';
import { connect } from 'react-redux';
import { getMe } from '../store/selectors';

import './Landing.scss';

const mapStateToProps = state => ({
  me: getMe(state)
});

class Landing extends React.Component {
  render() {
    const { me } = this.props;
    return (
      <div className="LandingPage">
        <h2>Landing</h2>
        {!!me || me === null ? null : (
          <button className="red btn-flat white-text">
            <a href="/auth/google">Log in with Google</a>
          </button>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Landing);

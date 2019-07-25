import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteUser } from '../store/actions';

const mapDispatchToProps = { deleteUser }

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h2>Settings Page</h2>
        <button className="red btn-flat white-text" onClick={() => this.props.deleteUser(this.props.history)}>
          Delete account
        </button>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Settings));

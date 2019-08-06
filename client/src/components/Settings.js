import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteUser } from '../store/actions';
import DeleteAccountPrompt from './DeleteAccountPrompt';

const mapDispatchToProps = { deleteUser };

class Settings extends React.Component {
  state = {
    isModalOpen: false
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  handleDelete = () => {
    const { deleteUser, history } = this.props;
    deleteUser(history);
  };

  render() {
    const { isModalOpen } = this.state;
    return (
      <div>
        <h2>Settings Page</h2>
        
        <button className="red btn-flat white-text" onClick={this.toggleModal}>
          Delete account
        </button>

        {isModalOpen &&
          <DeleteAccountPrompt 
            isOpen={isModalOpen}
            onSubmit={this.handleDelete}
            onCancel={this.toggleModal}
          />}
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Settings));

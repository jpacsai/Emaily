import React from 'react';
import Prompt from './common/Prompt';

const DeleteAccountPrompt = ({ isOpen, onSubmit, onCancel }) => {
  return (
    <Prompt
      className="DeleteAccountPrompt"
      isOpen={isOpen}
      onSubmit={onSubmit}
      submitLabel="Yes, delete!"
      onCancel={onCancel}
      title="Delete my account"
    >
      <p>Are you sure you want to delete your account?</p>
    </Prompt>
  );
};

export default DeleteAccountPrompt;

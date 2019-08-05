import React from 'react';
import Prompt from '../common/Prompt';

import './DeleteSurveyPrompt.scss';

const DeleteSurveyPrompt = ({ isOpen, onSubmit, onCancel, surveyTitle }) => {
  return (
    <Prompt
      className="DeleteSurveyPrompt"
      isOpen={isOpen}
      onSubmit={onSubmit}
      submitLabel="Yes, delete!"
      onCancel={onCancel}
      title="Delete survey"
    >
      <p>Are you sure you want to delete "<span>{surveyTitle}</span>" survey?</p>
    </Prompt>
  );
};

export default DeleteSurveyPrompt;

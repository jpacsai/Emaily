import React from 'react';
import Prompt from '../Prompt';

import SurveyResultChart from './SurveyResultChart';
// import './DeleteSurveyPrompt.scss';

const SurveyResultPrompt = ({ isOpen, onSubmit, onCancel, surveyTitle }) => {
  return (
    <Prompt
      className="SurveyResultPrompt"
      isOpen={isOpen}
      onCancel={onCancel}
      title="Survey results"
    >
      <p>Survey result of "<span>{surveyTitle}</span>"</p>
      <SurveyResultChart />
    </Prompt>
  );
};

export default SurveyResultPrompt;

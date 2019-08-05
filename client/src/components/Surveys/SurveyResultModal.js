import React from 'react';
import Modal from '../Modal';

import SurveyResultChart from './SurveyResultChart';
// import './DeleteSurveyPrompt.scss';

const SurveyResultModal = ({ isOpen, onCancel, surveyTitle }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={surveyTitle}
    >
      <SurveyResultChart />
    </Modal>
  );
};

export default SurveyResultModal;

import React from 'react';
import Modal from '../common/Modal';

import SurveyResultChart from './SurveyResultChart';

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

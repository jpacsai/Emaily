import React from 'react';
import Modal from '../common/Modal';
import { connect } from 'react-redux';
import { getSurveyResults } from './../../store/selectors';
import SurveyResultChart from './SurveyResultChart';

const mapStateToProps = (state, props) => ({
  results: getSurveyResults(state, props.id)
});

const SurveyResultModal = ({ isOpen, onCancel, surveyTitle, results }) => {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={surveyTitle}>
      <SurveyResultChart results={results} />
    </Modal>
  );
};

export default connect(
  mapStateToProps,
  null
)(SurveyResultModal);

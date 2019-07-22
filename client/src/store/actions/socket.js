import socketIOClient from 'socket.io-client';
import { resolveSurvey } from './actionCreators';

export const initSocketIO = () => async (dispatch) => {
  const endpoint = 'http://localhost:5000';
  const socket = socketIOClient(endpoint);

  socket.on('update-survey', survey => {
    if (survey) dispatch(resolveSurvey(survey));
  });
}
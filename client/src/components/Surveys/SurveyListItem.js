import React from 'react';
import classnames from 'classnames';
import './SurveyListItem.scss';

const SurveyListItem = ({survey, openPrompt}) => {
  const { id, title, body, yes, no, date_sent, recipients } = survey;

  return (
    <div className={classnames("SurveyListItem", "card red lighten-5")}>
      <div className="card-action right">
        <button className="btn-flat red white-text" onClick={() => openPrompt('delete', id)}>
          Delete<i className="material-icons right">delete</i>
        </button>
      </div>

      <div className="card-content">
        <span className="card-title">{title}</span>
        <p>{body}</p>
        <p className="right">Sent on: {new Date(date_sent).toLocaleDateString()}</p>
        <p>Total number of recipients: {recipients}</p>
      </div>

      <div className="card-action">
        <p className="yes">Yes: <span>{yes}</span></p>
        <p className="no">No: <span>{no}</span></p>
        <button className="btn-flat cyan darken-1 white-text" onClick={() => openPrompt('results', survey.id)}>
          Results<i className="material-icons right">pie_chart</i>
        </button>
      </div>
    </div>
  );
};

export default SurveyListItem;

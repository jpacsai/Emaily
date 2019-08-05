module.exports = ({ yes, no, _id, title, subject, body, recipients, date_sent, last_responded }) => ({
  yes,
  no,
  id: _id,
  title,
  subject,
  body,
  recipients: recipients.length,
  date_sent,
  last_responded
});

import emailValidation from './utils/emailValidation';

export const paths = {
  SURVEYS: '/surveys',
  NEW_SURVEYS: '/surveys/new',
  LOGOUT: '/api/logout'
}

export const formFields = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email body', name: 'body' },
  { label: 'Recipient List', name: 'recipients', validation: emailValidation }
];
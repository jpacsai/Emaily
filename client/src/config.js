import emailValidation from './utils/emailValidation';

export const paths = {
  SURVEYS: '/surveys',
  NEW_SURVEYS: '/surveys/new',
  CURRENT_USER: '/api/current_user',
  LOGOUT: '/api/logout',
  STRIPE: '/api/stripe'
}

export const formFields = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email body', name: 'body' },
  { label: 'Recipient List', name: 'emails', validation: emailValidation }
];
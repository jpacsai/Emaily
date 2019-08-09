import emailValidation from './utils/emailValidation';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import SurveyNew from './components/Surveys/SurveyNew';
import Settings from './components/Settings';

export const paths = {
  LANDING_PAGE: '/',
  SURVEYS: '/surveys',
  NEW_SURVEY: '/surveys/new',
  SETTINGS: '/settings'
}

export const routes = [
  { path: paths.LANDING_PAGE, component: Landing, exact: true, auth: false },
  { path: paths.SURVEYS, component: Dashboard, exact: true, auth: true },
  { path: paths.NEW_SURVEY, component: SurveyNew, exact: true, auth: true },
  { path: paths.SETTINGS, component: Settings, exact: true, auth: true }
];

export const formFields = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email body', name: 'body' },
  { label: 'Recipient List', name: 'recipients', validation: emailValidation }
];

export const surveySortOptions = [
  { value: 'newest', label: 'Created: newest' },
  { value: 'oldest', label: 'Created: oldest' },
  { value: 'answeredLow', label: 'Answered: lowest' },
  { value: 'answeredHigh', label: 'Answered: highest' }
]
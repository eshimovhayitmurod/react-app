import Applications from './pages/Applications';
import ApplicationsView from './pages/ApplicationsView';
const ApplicationsModule = [
   { index: true, element: <Applications /> },
   { path: ':id', element: <ApplicationsView /> },
];
export default ApplicationsModule;

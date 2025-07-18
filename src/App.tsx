import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import IndividualLogin from './pages/auth/IndividualLogin';
import CorporateLogin from './pages/auth/CorporateLogin';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import IndividualDashboard from './pages/individual/Dashboard';
import IndividualJobs from './pages/individual/Jobs';
import IndividualApplications from './pages/individual/Applications';
import IndividualNotifications from './pages/individual/Notifications';
import IndividualProfile from './pages/individual/Profile';
import CorporateDashboard from './pages/corporate/Dashboard';
import CorporateJobPost from './pages/corporate/JobPost';
import CorporateApplications from './pages/corporate/Applications';
import CorporateNotifications from './pages/corporate/Notifications';
import CorporateSettings from './pages/corporate/Settings';
import AdminRoutes from './pages/admin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Cookies from './pages/Cookies';
import NotFound from './pages/NotFound';
import ChatPage from './pages/ChatPage';
import ApplicationDetail from './pages/corporate/ApplicationDetail';
import Chat from './components/Chat';
import Chats from './pages/individual/Chats';
import Jobs from './pages/corporate/Jobs';
import JobDetail from './pages/corporate/JobDetail';
import JobEdit from './pages/corporate/JobEdit';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/individual" element={<IndividualLogin />} />
      <Route path="/login/corporate" element={<CorporateLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Individual user routes */}
      <Route path="/individual/dashboard" element={<IndividualDashboard />} />
      <Route path="/individual/jobs" element={<IndividualJobs />} />
      <Route path="/individual/applications" element={<IndividualApplications />} />
      <Route path="/individual/notifications" element={<IndividualNotifications />} />
      <Route path="/individual/profile" element={<IndividualProfile />} />
      <Route path="/individual/chat/:id" element={<Chat />} />
      <Route path="/individual/chats" element={<Chats />} />
      
      {/* Corporate user routes */}
      <Route path="/corporate/dashboard" element={<CorporateDashboard />} />
      <Route path="/corporate/post-job" element={<CorporateJobPost />} />
      <Route path="/corporate/applications" element={<CorporateApplications />} />
      <Route path="/corporate/applications/:id" element={<ApplicationDetail />} />
      <Route path="/corporate/notifications" element={<CorporateNotifications />} />
      <Route path="/corporate/settings" element={<CorporateSettings />} />
      <Route path="/corporate/jobs" element={<Jobs />} />
      <Route path="/corporate/job-detail/:id" element={<JobDetail />} />
      <Route path="/corporate/job-edit/:id" element={<JobEdit />} />
      
      {/* Admin panel route */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      
      {/* Privacy Policy route */}
      <Route path="/privacy" element={<PrivacyPolicy />} />
      
      {/* Terms of Use route */}
      <Route path="/terms" element={<TermsOfUse />} />
      
      {/* Cookies route */}
      <Route path="/cookies" element={<Cookies />} />
      
      {/* Chat route */}
      <Route path="/chat" element={<ChatPage />} />
      
      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
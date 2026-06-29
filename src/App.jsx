import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import NewAnalysis from './pages/NewAnalysis';



function App() {
  return (
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
          
              <Dashboard />
          
          }
        />
        
        <Route
          path="/analysis"
          element={
        
              <NewAnalysis />
          
          }
        />
        
        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import NewAnalysis from './pages/NewAnalysis';
import ProductsPage from './pages/ProductsPage';
import SignalsPage from './pages/SignalsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ProductionPage from './pages/ProductionPage';
import PricingPage from './pages/PricingPage';
import CitiesPage from './pages/CitiesPage';



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
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <NewAnalysis />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signals"
          element={
            <ProtectedRoute>
              <SignalsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <RecommendationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/production"
          element={
            <ProtectedRoute>
              <ProductionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pricing"
          element={
            <ProtectedRoute>
              <PricingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cities"
          element={
            <ProtectedRoute>
              <CitiesPage />
            </ProtectedRoute>
          }
        />
        
        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
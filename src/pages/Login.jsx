import { Button } from '@/components/ui/button';
import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { post, login, loading, error, isAuthenticated } = useAxios();
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await post('/auth/login', { email, password });
      // Assume backend returns { token: '...' }
      // login(response.token);
      navigate('/onboarding', { replace: true });
    } catch (err) {
      // Error is already set in useAxios state
      console.error('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-96 p-6 shadow-lg rounded">
        <h1 className="text-2xl mb-4 text-primary">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type='submit'>
          Lorem 
        </button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
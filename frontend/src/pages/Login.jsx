import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Lock, Mail, Shield, User } from 'lucide-react';
import { getAdminProfile } from '../services/api';
import logo from '../img/logo.png';

// API URL for image serving
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const API_PORT = import.meta.env.VITE_PORT || '4000';
const apiUrlForImages = API_BASE_URL.includes('://') ? API_BASE_URL : `http://${API_BASE_URL}:${API_PORT}`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Fetch admin profile for photo display
  const { data: adminProfile } = useQuery({
    queryKey: ['adminProfile'],
    queryFn: getAdminProfile,
    staleTime: 0, // Always fetch fresh data
    refetchOnWindowFocus: true,
    retry: 1,
  });

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Invalid email or password');
    }
    
    setLoading(false);
  };

  // Don't show login form if already authenticated (redirect will happen)
  if (isLoading || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-green-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4 mx-auto relative">
            {adminProfile?.profilePhoto ? (
              <img 
                src={`${apiUrlForImages}${adminProfile.profilePhoto}`} 
                alt="Admin Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
            ) : null}
            <div 
              className={`flex items-center justify-center bg-white rounded-full p-4 w-24 h-24 ${adminProfile?.profilePhoto ? 'hidden' : ''}`}
            >
              <img 
                src={logo} 
                alt="CodeEntra Logo" 
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
          <p className="text-gray-400">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-gray-300 mb-2 block">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </div>
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="codeentrasocial10@gmail.com"
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 pl-10"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 mb-2 block">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </div>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 pl-10"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold shadow-lg shadow-green-500/20 transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-center text-gray-400 text-sm">
              Secure access to CodeEntra admin panel
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 CodeEntra. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

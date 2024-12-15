import { useState, useEffect } from 'react';
import { Link, useNavigate } from "@remix-run/react";
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from "lucide-react";
import Layout from "~/components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const payload = isLogin ? { email, password } : { name, email, password };
  
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
  
      // Safely check role
      const role = data.role || 'user'; // Default to 'user' if role is undefined
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.name || '');
      localStorage.setItem('userRole', role);
  
      console.log("Admin h ya nhi: " + role);
  
      // Redirect based on role
      if (role === 'admin') {
        navigate('/AdminDashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Layout>
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Background Gradient Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/40 border border-white/10 mb-4">
            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? "Welcome to Avenster's Portal" : 'Join Platform'}
          </h1>
          <p className="text-gray-400">
            {isLogin 
              ? 'Access your AI-powered computer vision dashboard' 
              : 'Start your 14-day free trial with full platform access'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-black/40 rounded-3xl p-8 shadow-xl border border-white/10 relative overflow-hidden">
          {/* OAuth Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => loginWithRedirect()}
              className="w-full py-3 px-4 bg-black/60 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-black/80 transition-all duration-200"
            >
               <FontAwesomeIcon icon={faGoogle}  size={20} />
              Continue with Google
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/40 text-gray-400">Or continue with</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow duration-200 backdrop-blur-sm border border-gray-700/50"
                    placeholder="John Doe"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow duration-200 backdrop-blur-sm border border-gray-700/50"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow duration-200 backdrop-blur-sm border border-gray-700/50"
                  placeholder="••••••••"
                  required
                />
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="rounded bg-gray-800 border-gray-700 text-indigo-500 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember" className="ml-2 text-gray-400">
                      Remember me
                    </label>
                  </div>
                  <Link 
                    to="/forgot-password" 
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-indigo-600 hover:to-purple-700'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  isLogin ? 'Sign in to your account' : 'Create your account'
                )}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center text-sm text-gray-400">
            {isLogin ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                New to TensorGo?{' '}
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                  }}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  Create an account
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                  }}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  Sign in
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Terms and Privacy */}
        <p className="mt-8 text-center text-sm text-gray-400">
          By continuing, you agree to TensorGo's{' '}
          <Link to="/terms" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
    </Layout>

  );
}

// export function PrivateRoute({ children }) {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//     } else {
//       // Verify token with your backend
//       async function verifyToken() {
//         try {
//           const response = await fetch('http://localhost:8000/protected', {
//             headers: {
//               'Authorization': token
//             }
//           });
          
//           if (response.ok) {
//             setIsAuthenticated(true);
//           } else {
//             localStorage.removeItem('token');
//             navigate('/login');
//           }
//         } catch (error) {
//           console.error('Token verification failed:', error);
//           localStorage.removeItem('token');
//           navigate('/login');
//         } finally {
//           setIsLoading(false);
//         }
//       }

//       verifyToken();
//     }
//   }, [navigate]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   return isAuthenticated ? children : null;
// }
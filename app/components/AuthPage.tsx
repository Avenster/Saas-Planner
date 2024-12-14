import { useState } from 'react';
import { Link } from "@remix-run/react";
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Background Gradient Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            {isLogin ? 'Welcome back!' : 'Join us today'}
          </h1>
          <p className="text-gray-400">
            {isLogin 
              ? 'Were excited to see you again' 
              : 'Start your 30-day free trial. No credit card required.'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="backdrop-blur-xl bg-gray-900/70 rounded-2xl p-8 shadow-xl border border-gray-800/50 relative overflow-hidden">
          {/* Animated Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
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
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {isLogin ? 'Sign in to your account' : 'Create your account'}
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
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  Sign up
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
                  onClick={() => setIsLogin(true)}
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
          By continuing, you agree to our{' '}
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
  );
}

// Add this to your CSS/Tailwind config
const style = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;
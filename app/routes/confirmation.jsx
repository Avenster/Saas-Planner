import React from 'react';
import { Link } from '@remix-run/react';
import { CheckCircle } from 'lucide-react';

export default function ConfirmationRoute() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-4">Subscription Confirmed!</h1>
              <p className="text-gray-400 mb-8">
                Thank you for subscribing. Your payment has been processed successfully, and your subscription is now active.
              </p>
              
              <div className="bg-white/5 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
                <ul className="text-left space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Access your dashboard to start using our services
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Explore all the features included in your subscription
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Contact our support team if you need any assistance
                  </li>
                </ul>
              </div>
    
              <div className="space-y-4">
                <Link 
                  to="/AdminDashboard" 
                  className="block w-full py-3 px-4 rounded-full bg-white text-black hover:bg-gray-100 transition-colors"
                >
                  Go to Dashboard
                </Link>
                <Link 
                  to="/" 
                  className="block w-full py-3 px-4 rounded-full bg-black border border-white/10 hover:bg-gray-800 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    };
  
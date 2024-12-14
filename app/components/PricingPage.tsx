import { Link } from "@remix-run/react";
import { useState } from "react";

interface Feature {
  name: string;
  starter: boolean | string;
  pro: boolean | string;
  business: boolean | string;
  hasTooltip: boolean;
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("yearly");

  const plans = {
    pro: {
      monthly: 15,
      yearly: 12,
      yearlyTotal: 144
    },
    business: {
      monthly: 30,
      yearly: 25,
      yearlyTotal: 300
    }
  };

  const features: Feature[] = [
    { 
      name: 'Access to Analytics',
      starter: true,
      pro: true,
      business: true,
      hasTooltip: true
    },
    {
      name: 'Custom Branding',
      starter: '-',
      pro: '500/mo',
      business: '1,500/mo',
      hasTooltip: true
    },
    {
      name: 'Priority Support',
      starter: '-',
      pro: 'Email',
      business: 'Email & Chat',
      hasTooltip: false
    },
    {
      name: 'Advanced Reporting',
      starter: '-',
      pro: '-',
      business: true,
      hasTooltip: true
    },
    {
      name: 'Dedicated Manager',
      starter: '-',
      pro: '-',
      business: '-',
      hasTooltip: true
    },
    {
      name: 'API Access',
      starter: 'Limited',
      pro: 'Standard',
      business: 'Enhanced',
      hasTooltip: false
    },
    {
      name: 'Monthly Webinars',
      starter: '-',
      pro: true,
      business: true,
      hasTooltip: true
    },
    {
      name: 'Custom Integrations',
      starter: '-',
      pro: '-',
      business: 'Available',
      hasTooltip: true
    },
    {
      name: 'Roles and Permissions',
      starter: '-',
      pro: 'Basic',
      business: 'Advanced',
      hasTooltip: true
    },
    {
      name: 'Onboarding Assistance',
      starter: '-',
      pro: 'Self-service',
      business: 'Assisted',
      hasTooltip: true
    }
  ];

  const renderValue = (value: boolean | string) => {
    if (value === true) return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 mx-auto text-blue-500">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
    if (value === '-') return <span className="text-gray-600">—</span>;
    return <span className="text-gray-400">{value}</span>;
  };

  

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
       
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <p className="text-indigo-400 mb-4">Pricing</p>
        <h1 className="text-5xl font-bold mb-12">Start at full speed !</h1>
        
        {/* Billing Toggle */}
        <div className="inline-flex bg-gray-900 rounded-full p-1">
          <button
            className={`px-6 py-2 rounded-full transition-colors ${
              billingCycle === "yearly" ? "bg-white text-black" : "text-gray-400"
            }`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly (-20%)
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-colors ${
              billingCycle === "monthly" ? "bg-white text-black" : "text-gray-400"
            }`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Starter Card */}
        <div className="bg-gray-900/50 rounded-2xl p-8">
          <div className="mb-8">
            <h2 className="text-gray-400 mb-4">STARTER</h2>
            <div className="text-4xl font-bold">
              $0 <span className="text-gray-400 text-lg font-normal">/month</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Up to 100 monthly posts
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Basic analytics and reporting
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Access to standard templates
            </li>
            <li className="flex items-center text-sm text-gray-500">
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
              No priority access to new features
            </li>
            <li className="flex items-center text-sm text-gray-500">
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
              Limited customer support
            </li>
            <li className="flex items-center text-sm text-gray-500">
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
              No custom branding
            </li>
            <li className="flex items-center text-sm text-gray-500">
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
              Limited access to business resources
            </li>
          </ul>

          <button className="w-full py-3 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors">
            Sign in
          </button>
        </div>

        {/* Pro Card */}
        <div className="bg-gray-900/50 rounded-2xl p-8 ring-1 ring-indigo-500">
          <div className="mb-8">
            <h2 className="text-gray-400 mb-4">PRO</h2>
            <div className="text-4xl font-bold">
              ${billingCycle === "monthly" ? plans.pro.monthly : plans.pro.yearly} 
              <span className="text-gray-400 text-lg font-normal">/month</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              ${plans.pro.yearlyTotal} will be charged when annual
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Up to 500 monthly posts
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Advanced analytics and reporting
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Access to business templates
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Priority customer support
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Exclusive webinars and training
            </li>
            <li className="flex items-center text-sm text-gray-500">
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
              No custom branding
            </li>
            <li className="flex items-center text-sm text-gray-500">
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
              Limited access to business resources
            </li>
          </ul>

          <button className="w-full py-3 px-4 rounded-xl bg-white text-black hover:bg-gray-100 transition-colors">
            Sign in
          </button>
        </div>

        {/* Business Card */}
        <div className="bg-gray-900/50 rounded-2xl p-8">
          <div className="mb-8">
            <h2 className="text-gray-400 mb-4">BUSINESS</h2>
            <div className="text-4xl font-bold">
              ${billingCycle === "monthly" ? plans.business.monthly : plans.business.yearly}
              <span className="text-gray-400 text-lg font-normal">/month</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              ${plans.business.yearlyTotal} will be charged when annual
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Unlimited posts
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Real-time analytics and reporting
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Access to all templates, including custom branding
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              24/7 business customer support
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Personalized onboarding and account management
            </li>
          </ul>

          <button className="w-full py-3 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors">
            Sign in
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-16">
      <div className="text-center mb-16">
        <p className="text-indigo-400 mb-4">Plans</p>
        <h2 className="text-4xl font-bold text-white mb-4">Compare Our Plans</h2>
        <p className="text-gray-400">Find the perfect plan tailored for your business needs!</p>
      </div>

      <div className="rounded-lg overflow-hidden bg-black">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-5 px-6 text-left"></th>
              <th className="py-5 px-6 text-center text-white text-lg font-normal">Starter</th>
              <th className="py-5 px-6 text-center text-white text-lg font-normal">Pro</th>
              <th className="py-5 px-6 text-center text-white text-lg font-normal">Business</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {features.map((feature, index) => (
              <tr key={index}>
                <td className="py-4 px-6 text-white flex items-center gap-2">
                  {feature.name}
                  {feature.hasTooltip && (
                    <button className="text-gray-500">
                      <svg viewBox="0 0 24 24" className="w-4 h-4">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                    </button>
                  )}
                </td>
                <td className="py-4 px-6 text-center">{renderValue(feature.starter)}</td>
                <td className="py-4 px-6 text-center">{renderValue(feature.pro)}</td>
                <td className="py-4 px-6 text-center">{renderValue(feature.business)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    </div>
    
  );
}
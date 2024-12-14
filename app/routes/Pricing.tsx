import { Link } from "@remix-run/react";
import { useState } from "react";
import FAQSection from "~/components/FAQSection";
import PricingTable from "~/components/PricingTable";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("yearly");

  const plans = {
    standard: {
      monthly: 499,
      yearly: 4999,
      yearlyTotal: 4999
    },
    plus: {
      monthly: 399,
      yearly: 3999,
      yearlyTotal: 39990 // For 10 users minimum
    }
  };

  return (
    <div className="min-h-screen  bg-black text-white px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <p className="text-indigo-400 mb-4">Pricing</p>
        <h1 className="text-5xl font-bold mb-12">Start at full speed !</h1>
        
        {/* Billing Toggle */}
        <div className="inline-flex bg-black border border-white/10 rounded-[2rem] rounded-full p-1">
          <button
            className={`px-6 py-2 rounded-full transition-colors ${
              billingCycle === "yearly" ? "bg-white text-black" : "text-gray-400"
            }`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly 
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
        {/* Basic Card */}
        <div className="bg-black  border border-white/10 rounded-[2rem] p-8">
          <div className="mb-8">
            <h2 className="text-gray-400 mb-4">BASIC</h2>
            <div className="text-4xl font-bold">
              ₹0 <span className="text-gray-400 text-lg font-normal">/month</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              14 Days Free Trial
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Limited to 1 user
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
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Limited to 14 days
            </li>
            
          </ul>

          <button className="w-full py-3 px-4 rounded-[2rem] bg-black border border-white/10 hover:bg-gray-700 transition-colors">
            Start Free Trial
          </button>
        </div>

        {/* Standard Card */}
        <div className="border border-white/10 rounded-[2rem] p-8 ring-1 ring-indigo-500">
          <div className="mb-8">
            <h2 className="text-gray-400 mb-4">STANDARD</h2>
            <div className="text-4xl font-bold">
              ₹{billingCycle === "monthly" ? plans.standard.monthly : plans.standard.yearly}
              <span className="text-gray-400 text-lg font-normal">/user/year</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Up to 5 users
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Up to 5 team members
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
              Priority customer support
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Custom templates
            </li>
          </ul>

          <button className="w-full py-3 px-4 rounded-[2rem] bg-white text-black hover:bg-gray-100 transition-colors">
            Upgrade
          </button>
        </div>

        {/* Plus Card */}
        <div className="border border-white/10 rounded-[2rem] p-8">
          <div className="mb-8">
            <h2 className="text-gray-400 mb-4">PLUS</h2>
            <div className="text-4xl font-bold">
              ₹{billingCycle === "monthly" ? plans.plus.monthly : plans.plus.yearly}
              <span className="text-gray-400 text-lg font-normal">/user/year</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Minimum 10 users (₹{plans.plus.yearlyTotal} yearly)
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              10+ team members
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Real-time analytics
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              24/7 dedicated support
            </li>
            <li className="flex items-center text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Custom integrations
            </li>
          </ul>

          <button className="w-full py-3 px-4 rounded-[2rem] bg-black border border-white/10 hover:bg-gray-700 transition-colors">
          Upgrade
          </button>
        </div>
      </div>

      <PricingTable />
      <FAQSection />
    </div>
  );
}
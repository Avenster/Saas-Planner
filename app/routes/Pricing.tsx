import { Link, useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";
import FAQSection from "~/components/FAQSection";
import PricingTable from "~/components/PricingTable";
import Layout from "~/components/Layout";

import { loadStripe } from "@stripe/stripe-js";


export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("yearly");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const makepayment = async (planType) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const stripe = await loadStripe("pk_test_51QW5SZ082CzfLv9dlCvtKReQC1nT1HbsbyovGTw9zDHch7j7SkcHfiRigBFAIqHcTHoW9Y7DbZIOqErw7gPQoYHm006PlJNpts");
  
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }
  
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          billingCycle
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }
  
      const { id: sessionId } = await response.json();
  
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      setError(error.message);
      console.error('Payment initiation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/check");
      const data = await response.json();

      if (data.authenticated) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  };

 
  // Modified button components to use the new handler
  const SubscribeButton = ({ planType, children }) => (
    <button
      onClick={() => makepayment(planType)} // Updated onClick handler
      className={`w-full py-3 px-4 rounded-[2rem] ${
        planType === "standard"
          ? "bg-white text-black hover:bg-gray-100"
          : "bg-black border border-white/10 hover:bg-gray-700"
      } transition-colors`}
    >
      {children}
    </button>
  );

  const plans = {
    standard: {
      monthly: 499,
      yearly: 4999,
      yearlyTotal: 4999,
      stripeMonthlyPriceId: "price_monthly_standard_id",
      stripeYearlyPriceId: "price_yearly_standard_id",
    },
    plus: {
      monthly: 399,
      yearly: 3999,
      yearlyTotal: 39990,
      stripeMonthlyPriceId: "price_monthly_plus_id",
      stripeYearlyPriceId: "price_yearly_plus_id",
    },
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white px-4 py-16 ">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 mb-4">Pricing</p>
          <h1 className="text-5xl font-bold mb-12">Start at full speed!</h1>

          {/* Billing Toggle */}
          <div className="inline-flex bg-black border h-[2.5rem] border-white/10 rounded-[2rem] rounded-full p-1">
            <button
              className={`flex items-center px-6 py-2 rounded-full transition-colors ${
                billingCycle === "yearly" ? "bg-white text-black" : "text-gray-400"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
            </button>
            <button
              className={`px-6 py-2 flex items-center rounded-full transition-colors ${
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
          <div className="bg-black border border-white/10 rounded-[2rem] p-8">
            <div className="mb-8">
              <h2 className="text-gray-400 mb-4">BASIC</h2>
              <div className="text-4xl font-bold">₹0</div>
              <div className="text-sm text-gray-500 mt-2">14 Days Free Trial</div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Limited to 1 user
              </li>
              <li className="flex items-center text-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Basic analytics and reporting
              </li>
              <li className="flex items-center text-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Access to standard templates
              </li>
              <li className="flex items-center text-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
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
                ₹
                {billingCycle === "monthly" ? plans.standard.monthly : plans.standard.yearly}
                <span className="text-gray-400 text-lg font-normal">
                  /{billingCycle === "monthly" ? "month" : "year"}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Up to 5 users (₹
                {billingCycle === "monthly" ? "2495 monthly" : "24995 yearly"})
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                5+ Users
              </li>
              <li className="flex items-center text-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Analytics & Reports
              </li>
              <li className="flex items-center text-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Standard Templates
              </li>
            </ul>

            <SubscribeButton planType="standard">
              Upgrade to Standard
            </SubscribeButton>
          </div>

          {/* Plus Card */}
          <div className="border border-white/10 rounded-[2rem] p-8">
            <div className="mb-8">
              <h2 className="text-gray-400 mb-4">PLUS</h2>
              <div className="text-4xl font-bold">
                ₹
                {billingCycle === "monthly" ? plans.plus.monthly : plans.plus.yearly}
                <span className="text-gray-400 text-lg font-normal">
                  /{billingCycle === "monthly" ? "month" : "year"}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Up to 10 users (₹
                {billingCycle === "monthly" ? "2999 monthly" : "29990 yearly"})
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                10+ Users
              </li>
              <li className="flex items-center text-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Advanced analytics and reporting
              </li>
              <li className="flex items-center text-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 mr-3">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Priority Support
              </li>
            </ul>

            <SubscribeButton planType="plus">
              Upgrade to Plus
            </SubscribeButton>
          </div>
        </div>
        <PricingTable/>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </Layout>
  );
}

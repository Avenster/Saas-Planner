import { Link, useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";
import FAQSection from "~/components/FAQSection";
import PricingTable from "~/components/PricingTable";
import Layout from "~/components/Layout";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("yearly");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Replace with your actual auth check
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      
      if (data.authenticated) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const handleSubscription = async (planType) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      // Store the intended destination to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', '/pricing');
      navigate('/login');
      return;
    }

    try {
      const stripe = await stripePromise;
      
      // Create Stripe checkout session on your backend
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: billingCycle === 'monthly' 
            ? plans[planType].stripeMonthlyPriceId 
            : plans[planType].stripeYearlyPriceId,
          userId: user.id
        }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
        // Handle errors here
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  // Modified button components to use the new handler
  const SubscribeButton = ({ planType, children }) => (
    <button 
      onClick={() => handleSubscription(planType)}
      className={`w-full py-3 px-4 rounded-[2rem] ${
        planType === 'standard' 
          ? 'bg-white text-black hover:bg-gray-100' 
          : 'bg-black border border-white/10 hover:bg-gray-700'
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
      stripeMonthlyPriceId: 'price_monthly_standard_id',
      stripeYearlyPriceId: 'price_yearly_standard_id'
    },
    plus: {
      monthly: 399,
      yearly: 3999,
      yearlyTotal: 39990,
      stripeMonthlyPriceId: 'price_monthly_plus_id',
      stripeYearlyPriceId: 'price_yearly_plus_id'
    }
  };

  return (
    <Layout>
    <div className="min-h-screen  bg-black text-white px-4 py-16 mt-20">
      {/* Header Section */}
      <div className="text-center mb-16">
        <p className="text-indigo-400 mb-4">Pricing</p>
        <h1 className="text-5xl font-bold mb-12">Start at full speed!</h1>
        
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
              ₹0 
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
  <span className="text-gray-400 text-lg font-normal">/{billingCycle === "monthly" ? "month" : "year"}</span>
</div>

<div className="text-sm text-gray-500 mt-2">
  Up to 5 users (₹{billingCycle === "monthly" ? "2495 monthly" : "24995 yearly"})
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

          <SubscribeButton planType="standard">Upgrade</SubscribeButton>
        </div>

        {/* Plus Card */}
        <div className="border border-white/10 rounded-[2rem] p-8">
          <div className="mb-8">
            <h2 className="text-gray-400 mb-4">PLUS</h2>

            <div className="text-4xl font-bold">
  ₹{billingCycle === "monthly" ? plans.plus.monthly : plans.plus.yearly}
  <span className="text-gray-400 text-lg font-normal">/{billingCycle === "monthly" ? "month" : "year"}</span>
</div>

<div className="text-sm text-gray-500 mt-2">
  Minimum 10 users (₹{billingCycle === "monthly" ? "3990 monthly" : plans.plus.yearlyTotal + " yearly"})
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

          <SubscribeButton planType="plus">Upgrade</SubscribeButton>
        </div>
      </div>

      <PricingTable />
      <FAQSection />
    </div>
    </Layout>
  );
}
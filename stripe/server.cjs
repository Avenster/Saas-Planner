const express = require('express');
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const FRONTEND_URL = 'http://localhost:5173';

// Define price amounts in paise (1 INR = 100 paise)
const PLANS = {
  standard: {
    monthly: 49900,  // ₹499.00
    yearly: 499900,  // ₹4,999.00
    name: 'Standard Plan'
  },
  plus: {
    monthly: 39900,  // ₹399.00
    yearly: 399900,  // ₹3,999.00
    name: 'Plus Plan'
  }
};

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { planType, billingCycle, success_url, cancel_url } = req.body;
    
    if (!planType || !billingCycle) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    if (!PLANS[planType]) {
      return res.status(400).json({ error: 'Invalid plan type' });
    }

    const plan = PLANS[planType];
    const amount = plan[billingCycle];

    console.log('Creating session for:', {
      planType,
      billingCycle,
      amount
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `${plan.name} (${billingCycle})`,
              description: `Subscription to ${plan.name}, billed ${billingCycle}`
            },
            unit_amount: amount,
            recurring: {
              interval: billingCycle === 'monthly' ? 'month' : 'year'
            }
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: success_url,
      cancel_url: cancel_url,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL configured as: ${FRONTEND_URL}`);
});
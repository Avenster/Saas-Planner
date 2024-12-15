import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: "What is the cost of the Basic plan?",
      answer: "The Basic plan is free for 14 days and allows a single user to access limited features, making it ideal for individuals who want to explore our platform.",
      isOpen: false
    },
    {
      question: "How much does the Standard plan cost?",
      answer: "The Standard plan costs INR 4999 per year, per user, and supports up to 5 users. It includes enhanced features like custom branding and priority email and chat support.",
      isOpen: false
    },
    {
      question: "What is the price of the Plus plan?",
      answer: "The Plus plan is priced at INR 3999 per year, per user for teams with more than 10 users. It offers advanced features such as 24/7 priority support and custom integrations.",
      isOpen: false
    },
    {
      question: "Do you offer any trial periods?",
      answer: "Yes, all plans include a 14-day free trial. No credit card is required to get started.",
      isOpen: false
    },
    {
      question: "Are there any limitations on the Basic plan?",
      answer: "Yes, the Basic plan is limited to a single user and provides access to core features like analytics but excludes advanced features such as custom branding or API access.",
      isOpen: false
    },
    {
      question: "Can I upgrade my plan at any time?",
      answer: "Absolutely! You can upgrade from Basic to Standard or Plus at any time to access additional features and increased usage limits.",
      isOpen: false
    }
  ]);

  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => ({
      ...faq,
      isOpen: i === index ? !faq.isOpen : false
    })));
  };

  return (
    <div className="max-w-7xl mx-auto mt-32 px-4">
      <div className="text-center mb-16">
        <p className="text-indigo-400 mb-4">FAQ</p>
        <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our comprehensive FAQ to find quick answers to common inquiries. If 
          you need further assistance, don't hesitate to contact us for personalized help.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border-b border-gray-800"
          >
            <button
              className="w-full py-6 flex justify-between items-center text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-white text-lg">{faq.question}</span>
              <span className="text-gray-400 ml-4">
                {faq.isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            {faq.isOpen && (
              <div className="pb-6 text-gray-400">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
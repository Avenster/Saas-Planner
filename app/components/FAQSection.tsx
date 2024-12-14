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
      question: "What is the cost of the free plan?",
      answer: "Our free plan is completely free, with no monthly or annual charges. It's a great way to get started and explore our basic features.",
      isOpen: false
    },
    {
      question: "How much does the Basic Monthly plan cost?",
      answer: "The Basic Monthly plan starts at $9.99 per month, offering enhanced features and increased usage limits compared to the free plan.",
      isOpen: false
    },
    {
      question: "What is the price of the Pro Monthly plan?",
      answer: "The Pro Monthly plan is priced at $29.99 per month, providing access to advanced features and priority support.",
      isOpen: false
    },
    {
      question: "Do you offer any annual subscription plans?",
      answer: "Yes, we offer annual plans with a 20% discount compared to monthly billing. This makes it a cost-effective choice for long-term users.",
      isOpen: false
    },
    {
      question: "Is there a trial period for the paid plans?",
      answer: "Yes, all paid plans come with a 14-day free trial. No credit card is required to start your trial.",
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
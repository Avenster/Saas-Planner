import React from 'react';

type FeatureValue = boolean | string | '-';

interface Feature {
  name: string;
  hasTooltip: boolean;
  basic: FeatureValue;
  standard: FeatureValue;
  plus: FeatureValue;
 
}

const PricingTable = () => {
  const features = [
    { name: 'Access to Analytics', hasTooltip: true, basic: true, standard: true, plus: true },
    { name: 'Custom Branding', hasTooltip: true, basic: '-', standard: 'INR 4999 Per Year, Per User', plus: 'INR 3999 Per Year, Per User' },
    { name: 'Priority Support', hasTooltip: false, basic: '-', standard: 'Email & Chat', plus: '24/7 Support' },
    { name: 'Advanced Reporting', hasTooltip: true, basic: '-', standard: true, plus: true },
    { name: 'Dedicated Manager', hasTooltip: true, basic: '-', standard: '-', plus: 'Available' },
    { name: 'API Access', hasTooltip: false, basic: 'Limited', standard: 'Standard', plus: 'Enhanced' },
    { name: 'Monthly Webinars', hasTooltip: true, basic: '-', standard: true, plus: true },
    { name: 'Custom Integrations', hasTooltip: true, basic: '-', standard: 'Available', plus: 'Available' },
    { name: 'Roles and Permissions', hasTooltip: true, basic: '-', standard: 'Basic', plus: 'Advanced' },
    { name: 'Onboarding Assistance', hasTooltip: true, basic: '-', standard: 'Self-service', plus: 'Assisted' }
  ];


  const renderValue = (value: FeatureValue) => {
    if (value === true) {
      return (
        <svg className="w-5 h-5 mx-auto text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>
      );
    }
    if (value === '-') {
      return <span className="text-gray-500">—</span>;
    }
    return <span className="text-gray-300">{value}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mb-16 mt-32">
      <div className="text-center mb-16">
        <p className="text-indigo-400 mb-4">Plans</p>
        <h2 className="text-4xl font-bold text-white mb-4">Compare Our Plans</h2>
        <p className="text-gray-400">Find the perfect plan tailored for your business needs!</p>
      </div>

      <div className="rounded-lg overflow-hidden border border-white/10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="py-5 px-6 text-left"></th>
              {['Basic','Standard','Plus'].map((plan) => (
                <th key={plan} className="py-5 px-6 text-center text-white text-lg font-semibold">
                  {plan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {features.map((feature, index) => (
              <tr key={index} className="border-t border-white/10 hover:bg-gray-900/50 transition-colors">
                <td className="py-4 px-6 text-white flex items-center gap-2">
                  {feature.name}
                  {feature.hasTooltip && (
                    <button className="text-gray-500 hover:text-gray-400">
                      <svg viewBox="0 0 24 24" className="w-4 h-4">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                    </button>
                  )}
                </td>
                <td className="py-4 px-6 text-center border-l border-white/10">{renderValue(feature.basic)}</td>
                <td className="py-4 px-6 text-center border-l border-white/10">{renderValue(feature.standard)}</td>
                <td className="py-4 px-6 text-center border-l border-white/10">{renderValue(feature.plus)}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;
import React from 'react';

type FeatureValue = boolean | string | '-';

interface Feature {
  name: string;
  hasTooltip: boolean;
  starter: FeatureValue;
  pro: FeatureValue;
  business: FeatureValue;
  enterprise: FeatureValue;
}

const PricingTable = () => {
  const features: Feature[] = [
    { name: 'Access to Analytics', hasTooltip: true, starter: true, pro: true, business: true, enterprise: 'Custom' },
    { name: 'Custom Branding', hasTooltip: true, starter: '-', pro: '500/mo', business: '1,500/mo', enterprise: 'Unlimited' },
    { name: 'Priority Support', hasTooltip: false, starter: '-', pro: 'Email', business: 'Email & Chat', enterprise: '24/7 Support' },
    { name: 'Advanced Reporting', hasTooltip: true, starter: '-', pro: '-', business: true, enterprise: 'Custom' },
    { name: 'Dedicated Manager', hasTooltip: true, starter: '-', pro: '-', business: '-', enterprise: true },
    { name: 'API Access', hasTooltip: false, starter: 'Limited', pro: 'Standard', business: 'Enhanced', enterprise: 'Full' },
    { name: 'Monthly Webinars', hasTooltip: true, starter: '-', pro: true, business: true, enterprise: 'Custom' },
    { name: 'Custom Integrations', hasTooltip: true, starter: '-', pro: '-', business: 'Available', enterprise: 'Available' },
    { name: 'Roles and Permissions', hasTooltip: true, starter: '-', pro: 'Basic', business: 'Advanced', enterprise: 'Advanced' },
    { name: 'Onboarding Assistance', hasTooltip: true, starter: '-', pro: 'Self-service', business: 'Assisted', enterprise: 'Full Service' }
  ];

  const renderValue = (value: FeatureValue) => {
    if (value === true) {
      return (
        <svg className="w-5 h-5 mx-auto text-blue-500" fill="currentColor" viewBox="0 0 20 20">
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
        <p className="text-blue-500 mb-4">Plans</p>
        <h2 className="text-4xl font-bold text-white mb-4">Compare Our Plans</h2>
        <p className="text-gray-400">Find the perfect plan tailored for your business needs!</p>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-800">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-900">
              <th className="py-5 px-6 text-left"></th>
              {['Starter', 'Pro', 'Business', 'Enterprise'].map((plan) => (
                <th key={plan} className="py-5 px-6 text-center text-white text-lg font-semibold">
                  {plan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {features.map((feature, index) => (
              <tr key={index} className="border-t border-gray-800 hover:bg-gray-900/50 transition-colors">
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
                <td className="py-4 px-6 text-center border-l border-gray-800">{renderValue(feature.starter)}</td>
                <td className="py-4 px-6 text-center border-l border-gray-800">{renderValue(feature.pro)}</td>
                <td className="py-4 px-6 text-center border-l border-gray-800">{renderValue(feature.business)}</td>
                <td className="py-4 px-6 text-center border-l border-gray-800">{renderValue(feature.enterprise)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;
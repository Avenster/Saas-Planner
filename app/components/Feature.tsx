import { Brain, Shield, Users, LineChart as ChartIcon } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function Features() {
  // Sample data for the ML accuracy chart
  const data = Array.from({ length: 20 }, (_, i) => ({
    value: Math.random() * 15 + 80 // Values between 80-95 to show high accuracy
  }));

  return (
    <section className="py-20 bg-black">
      <div className="w-[80%] mx-auto">
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Enterprise-Ready Card */}
          <div className="bg-black/40 p-8 rounded-3xl border border-white/10">
            <div className="mb-4">
              <span className="text-indigo-500 text-5xl font-bold">99.9%</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Enterprise-Ready</h3>
            <p className="text-gray-400">
              State-of-the-art neural networks with industry-leading accuracy for your computer vision needs.
            </p>
          </div>

          {/* Security Card */}
          <div className="bg-black/40 p-8 rounded-3xl border border-white/10">
            <div className="mb-4 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
              <Shield size={24} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Enterprise Security</h3>
            <p className="text-gray-400">
              Advanced security measures to protect your sensitive data and ML models with enterprise-grade infrastructure.
            </p>
          </div>

          {/* ML Performance Card */}
          <div className="bg-black/40 p-8 rounded-3xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <ChartIcon size={20} />
              <span className="text-gray-400">ML Performance</span>
            </div>
            <div className="h-16 mb-4">
               <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#818cf8" 
                    strokeWidth={2} 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <h3 className="text-2xl font-bold mb-2">High Performance ML</h3>
            <p className="text-gray-400">
              Optimized infrastructure for running complex ML/DL models with maximum efficiency and speed.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-6">
          {/* API Integration Card */}
          <div className="col-span-4 bg-black/40 p-8 rounded-3xl border border-white/10">
            <div className="mb-4 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
              <Brain size={24} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Easy API Integration</h3>
            <p className="text-gray-400">
              Simple and powerful APIs to integrate computer vision capabilities into your applications.
            </p>
          </div>

          {/* Usage Analytics Card */}
          <div className="col-span-4 bg-black/40 p-8 rounded-3xl border border-white/10">
            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#818cf8" 
                    strokeWidth={2} 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              
            </div>

            <h3 className="text-2xl font-bold mb-2">Real-Time Insights</h3>
            <p className="text-gray-400">
            Gain actionable insights with live analytics and performance monitoring to optimize your machine learning models.
            </p>
          </div>

          {/* Team Management Card */}
          <div className="col-span-4 bg-black/40 p-8 rounded-3xl border border-white/10">
            <div className="mb-4 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
              <Users size={24} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Team Collaboration</h3>
            <p className="text-gray-400">
              Manage your organization's users and access controls with flexible team management.
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
}
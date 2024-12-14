import { Download, Shield, Share2 } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function Features() {
  // Sample data for the chart
  const data = Array.from({ length: 20 }, (_, i) => ({
    value: Math.random() * 100 + 50
  }));

  return (
    <section className="py-20 bg-black">
      <div className="w-[80%] mx-auto">
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Customizable Card */}
          <div className="bg-black/40 p-8 rounded-3xl border border-white/10">
            <div className="mb-4">
              <span className="text-indigo-500 text-5xl font-bold">100%</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Customizable</h3>
            <p className="text-gray-400">
              Provident fugit and vero voluptate. magnam magni doloribus dolores voluptates a sapiente nisi.
            </p>
          </div>

          {/* Secure Card */}
          <div className="bg-black/40 p-8 rounded-3xl border border-white/10">
            <div className="mb-4 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
              <Shield size={24} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Secure by default</h3>
            <p className="text-gray-400">
              Provident fugit and vero voluptate. magnam magni doloribus dolores voluptates a sapiente nisi.
            </p>
          </div>

          {/* Speed Card */}
          <div className="bg-black/40 p-8 rounded-3xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <Download size={20} />
              <span className="text-gray-400">14,34 mbps</span>
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
            <h3 className="text-2xl font-bold mb-2">Faster than light</h3>
            <p className="text-gray-400">
              Provident fugit vero voluptate. magnam magni doloribus dolores voluptates inventore nisi.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-6">
          {/* Security Card */}
          <div className="col-span-4 bg-black/40 p-8 rounded-3xl border border-white/10">
            <div className="mb-4 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
              <Shield size={24} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Faster than light</h3>
            <p className="text-gray-400">
              Provident fugit vero voluptate. Voluptates a sapiente inventore nisi.
            </p>
          </div>

          {/* Chart Card */}
          <div className="col-span-4 bg-black/40 p-8 rounded-3xl border border-white/10">
            <div className="h-40">
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
          </div>

          {/* Team Card */}
          <div className="col-span-4 bg-black/40 p-8 rounded-3xl border border-white/10">
            <div className="mb-4 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
              <Share2 size={24} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Keep your loved ones safe</h3>
            <p className="text-gray-400">
              Voluptate. magnam magni doloribus dolores voluptates a sapiente.
            </p>
            <div className="mt-6 relative">
              <div className="flex -space-x-2 justify-end">
                <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full border-2 border-black" />
                <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full border-2 border-black" />
                <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full border-2 border-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
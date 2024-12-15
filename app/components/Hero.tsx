import { Link } from "@remix-run/react";
import { ArrowRight, Github } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-[500px] flex items-center justify-center bg-black">
      <div className="w-[80%] mx-auto text-center">
        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <Link 
            to="#" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 hover:bg-black/60"
          >
            🚀 Enterprise-Grade Computer Vision Platform
          </Link>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl font-bold mb-4">
          Scale Your Vision
          <br />
          with <span className="text-indigo-500">Avenster</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-xl mb-8 max-w-3xl mx-auto">
          Recognized by Gartner as a Cool Vendor in AI for Computer Vision.
          <br />
          Start with our 14-day free trial and transform your ML/DL applications.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Link 
            to="/Pricing" 
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-100"
          >
            View Plans <ArrowRight size={20} />
          </Link>
          
          <Link 
            to="https://github.com/Avenster/Saas-Planner" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-black/40 hover:bg-black/60"
          >
            <Github size={20} /> View Repo
          </Link>
        </div>
      </div>
    </section>
  );
}
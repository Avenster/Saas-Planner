import { Link } from "@remix-run/react";
import { ArrowRight, Github } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-[450px] flex items-center justify-center bg-black">
      <div className="w-[80%] mx-auto text-center">
        {/* Twitter/X Button */}
        <div className="flex justify-center mb-8">
          <Link 
            to="#" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 hover:bg-black/60"
          >
            🎉 Introducing Next Auth Roles Template on X
          </Link>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl font-bold mb-4">
          Kick off with a bang
          <br />
          with <span className="text-indigo-500">SaaS Starter</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-xl mb-8 max-w-3xl mx-auto">
          Build your next project using Next.js 14, Prisma, Neon,
          <br />
          Auth.js v5, Resend, React Email, Shadcn/ui, Stripe.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Link 
            to="/Pricing" 
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-100"
          >
            Go Pricing <ArrowRight size={20} />
          </Link>
          
          <Link 
            to="#" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-black/40 hover:bg-black/60"
          >
            <Github size={20} /> Star on GitHub 2K
          </Link>
        </div>
      </div>
    </section>
  );
}
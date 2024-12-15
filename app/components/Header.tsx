import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/90 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <nav className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <img
                src="/favicon.ico"
                alt="SaaS Starter Logo"
                className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                SaaS Starter
              </span>
            </Link>
            
            <div className="flex items-center space-x-6">
              {[
                { to: "/pricing", label: "Pricing" },
                { to: "/blog", label: "Blog" },
                { to: "/docs", label: "Documentation" }
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          <Link
            to="/Login"
            className="group relative inline-flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:from-indigo-500 hover:to-indigo-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              <span className="font-medium tracking-wide">Login</span>
              <svg
                className="w-4 h-4 transform transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full duration-1000 transform transition-all" />
          </Link>
        </div>
      </div>
    </header>
  );
}
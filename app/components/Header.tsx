import { Link, useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check login status
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("scroll", handleScroll);
    checkLoginStatus(); // Check initially
    
    // Set up an interval to periodically check login status
    const intervalId = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 right-0 w-full z-50 transition-all duration-300 border-b border-b-white/10 backdrop-blur-md bg-black/10 ${
        isScrolled 
          ? "bg-black/90 shadow-lg" 
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

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="group relative inline-flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-white-600 to-white-400 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:from-red-500 hover:to-red-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-600/40 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <span className="font-medium tracking-wide">Logout</span>
                <svg
                  className="w-4 h-4 transform transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </span>
              <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full duration-1000 transform transition-all" />
            </button>
          ) : (
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
          )}
        </div>
      </div>
    </header>
  );
}
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

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-black/80 backdrop-blur-sm shadow sticky top-0 ${
      isScrolled ? 'border-b border-white/10' : 'border-b border-transparent'
    }`}>
      <div className="w-[80%] mx-auto px-4 py-4 flex justify-between items-center">
        <nav className="flex gap-8 justify-center items-center">
          <Link to="/" className="text-m font-bold flex items-center gap-2">
            <img src="/favicon.ico" alt="SaaS Starter Logo" className="w-5 h-5" />
            SaaS Starter
          </Link>
          <Link to="/pricing" className="flex justify-center items-center text-gray-300 font-light text-sm">Pricing</Link>
          <Link to="/blog" className="flex justify-center items-center text-gray-300 font-light text-sm">Blog</Link>
          <Link to="/docs" className="flex justify-center items-center text-gray-300 font-light text-sm">Documentation</Link>
        </nav>
        <Link to="/Login" className="flex justify-center items-center w-[8rem] h-8 bg-white text-black rounded-full">
          Login
        </Link>
      </div>
    </header>
  );
}
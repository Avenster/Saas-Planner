import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="bg-black shadow sticky top-0 border-b-1 border-white-300">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
      <nav className="flex gap-[2rem] justify-center align-center">
        <Link to="/" className="text-xl font-bold ">SaaS Starter</Link>
        <Link to="/pricing" className="flex justify-center items-center mr-4">Pricing</Link>
        <Link to="/blog" className="flex justify-center align-center mr-4">Blog</Link>
        <Link to="/docs" className="flex justify-center align-center mr-4">Documentation</Link>
    </nav>
        <Link to="/login" className="flex justify-center align-center mr-4 w-[5rem] h-[2rem] items-center bg-white text-black rounded-full">Login</Link>
       
        
      </div>
    </header>
  );
}

import { Link } from "@remix-run/react";
import { Github, Moon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-white/10">
      {/* Main Footer */}
      <div className="w-[80%] mx-auto py-12 grid grid-cols-4 gap-8">
        {/* Company Section */}
        <div>
          <h3 className="text-white text-sm font-medium mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/enterprise" className="hover:text-white">Enterprise</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
          </ul>
        </div>

        {/* Product Section */}
        <div>
          <h3 className="text-white text-sm font-medium mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/security" className="hover:text-white">Security</Link></li>
            <li><Link to="/customization" className="hover:text-white">Customization</Link></li>
            <li><Link to="/customers" className="hover:text-white">Customers</Link></li>
            <li><Link to="/changelog" className="hover:text-white">Changelog</Link></li>
          </ul>
        </div>

        {/* Docs Section */}
        <div>
          <h3 className="text-white text-sm font-medium mb-3">Docs</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/docs/introduction" className="hover:text-white">Introduction</Link></li>
            <li><Link to="/docs/installation" className="hover:text-white">Installation</Link></li>
            <li><Link to="/docs/components" className="hover:text-white">Components</Link></li>
            <li><Link to="/docs/code-blocks" className="hover:text-white">Code Blocks</Link></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-white text-sm font-medium mb-3">Subscribe to our newsletter</h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="janedoe@example.com"
              className="flex-1 px-5 py-3 text-sm rounded-[2rem] bg-black border border-white/10 focus:outline-none focus:border-white/20"
            />
            <button className="px-3 py-1.5 text-sm bg-white text-black rounded-[2rem] hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-[80%] mx-auto py-4 flex justify-between items-center">
          {/* Credits */}
          <div className="text-xs">
            Built by{" "}
            <Link to="*" className="underline hover:text-white">Avenster</Link>
            . Hosted on{" "}
            <Link to="*" className="underline hover:text-white">Vercel</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <Link to="https://github.com/Avenster/Saas-Planner" className="hover:text-white">
              <Github size={18} />
            </Link>
            <button className="hover:text-white">
              <Moon size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
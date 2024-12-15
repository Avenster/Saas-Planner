import { useEffect, useState } from "react";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Settings, Home, FileText, BarChart3, CreditCard, Files, 
         BookOpen, HelpCircle, Menu, Search, Moon, ClipboardList, LogOut } from 'lucide-react';

interface MenuItem {
  icon: JSX.Element;
  label: string;
  path: string;
}

interface MenuSection {
  heading: string;
  items: MenuItem[];
}

// Helper function to safely access localStorage
const getLocalStorage = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

// Helper function to safely set localStorage
const setLocalStorage = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

// Helper function to safely remove from localStorage
const removeLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};


export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
    setUserName(getLocalStorage('userName'));
  }, []);

  // Check authentication on component mount
  useEffect(() => {
    if (!isClient) return;

    const token = getLocalStorage('token');
    if (!token) {
      navigate('/Login');
      return;
    }

    // Verify token with backend
    const verifyToken = async () => {
      try {
        const response = await fetch('http://localhost:8000/protected', {
          headers: {
            'Authorization': token
          }
        });
        
        if (!response.ok) {
          removeLocalStorage('token');
          removeLocalStorage('userName');
          navigate('/Login');
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        removeLocalStorage('token');
        removeLocalStorage('userName');
        navigate('/Login');
      }
    };

    verifyToken();
  }, [navigate, isClient]);

  const handleLogout = () => {
    removeLocalStorage('token');
    removeLocalStorage('userName');
    navigate('/Login');
  };

  const menuItems: MenuSection[] = [
    { 
      heading: 'MENU', 
      items: [
        { icon: <ClipboardList size={18} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <CreditCard size={18} />, label: 'Billing', path: '/billing' },
        { icon: <BarChart3 size={18} />, label: 'Charts', path: '/charts' },
        { icon: <Files size={18} />, label: 'User Posts', path: '/posts' },
      ]
    },
    { 
      heading: 'OPTIONS', 
      items: [
        { icon: <Settings size={18} />, label: 'Settings', path: '/settings' },
        { icon: <Home size={18} />, label: 'Homepage', path: '/home' },
        { icon: <BookOpen size={18} />, label: 'Documentation', path: '/docs' },
        { icon: <HelpCircle size={18} />, label: 'Support', path: '/support' },
      ]
    },
  ];


  return (
    <div className="flex h-screen bg-black text-gray-300">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/10 flex flex-col">

        {/* Project selector */}
        <div className="p-4 border-b h-[4.5rem] border-white/10">
          <button className="w-full pt-3 justify-center flex items-center gap-2 text-white">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            project-number...
            <Menu size={16} className="ml-auto" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-8">
          {menuItems.map((section, idx) => (
            <div key={idx}>
              <p className="text-xs text-gray-500 mb-4">{section.heading}</p>
              <ul className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
                          isActive ? 'bg-gray-800 text-white' : 'text-gray-300'
                        }`
                      }
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Upgrade CTA */}
        <div className="p-4 border border-white/10 w-[90%] mb-6 ml-3 rounded-lg">
          <div className="mb-4">
            <h3 className="text-white font-medium">Upgrade to Pro</h3>
            <p className="text-sm text-gray-500">
              Unlock all features and get unlimited access to our support team.
            </p>
          </div>
          <button className="w-full bg-white text-black py-2 rounded-3xl hover:bg-gray-100 transition-colors">
            Upgrade
          </button>
        </div>
      </div>


      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b h-[4.5rem] border-white/10 p-4 flex items-center justify-between">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full  rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">⌘K</span>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Moon size={18} />
            </button>

            <button onClick={handleLogout} className="flex justify-center items-center w-[8rem] h-8 bg-white text-black rounded-full"> Logout</button>
            <div className="w-8 h-8 overflow-hidden border border-white/10 rounded-full bg-gray-700"> <img src="/avatar-svgrepo-com.svg" alt="" /></div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">
              Welcome, {userName || 'User'}
            </p>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <FileText size={24} />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No content created</h2>
            <p className="text-gray-400 mb-4">
              You don't have any content yet. Start creating content.
            </p>
            <button className="bg-white text-black px-8 py-2 rounded-3xl hover:bg-gray-100 transition-colors">
              Add Content
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
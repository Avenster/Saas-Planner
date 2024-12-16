import React, { useState } from 'react';
import { 
  Users, CreditCard, Clock, FileText, Settings, 
  Search, Moon, Menu, HelpCircle, Download, 
  UserPlus, MessageSquare, ArrowUpCircle
} from 'lucide-react';
import { 
  CheckCircle, UserCheck, Circle, 
  Wallet, Calendar, Activity, BarChart2, TrendingUp, LifeBuoy, 
  Shield, Mail, Receipt
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useNavigate } from '@remix-run/react';



const AdminDashboard = () => {
  const getLocalStorage = (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };
  const token = getLocalStorage('token');
  
  const [activeTab, setActiveTab] = useState('overview');
  const removeLocalStorage = (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    removeLocalStorage('token');
    removeLocalStorage('userName');
    navigate('/Login');
  };

  // Sample data
  const currentPlan = {
    name: 'Standard',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    maxUsers: 5,
    currentUsers: 4,
    price: '₹4,999/user/year',
    status: 'Active',
    renewalDate: '2024-12-31'
  };

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', lastLogin: '2024-12-15 09:30 AM', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', lastLogin: '2024-12-15 10:15 AM', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', lastLogin: '2024-12-14 03:45 PM', status: 'Active' }
  ];

  const payments = [
    { id: 1, date: '2024-12-01', amount: '₹19,996', status: 'Paid', invoice: 'INV-2024-001' },
    { id: 2, date: '2024-11-01', amount: '₹19,996', status: 'Paid', invoice: 'INV-2024-002' }
  ];

  const menuItems = {
    heading: 'ADMIN PORTAL',
    items: [
      { icon: <Users size={18} />, label: 'User Management', tab: 'users' },
      { icon: <CreditCard size={18} />, label: 'Plan & Billing', tab: 'plan' },
      { icon: <Clock size={18} />, label: 'Activity Logs', tab: 'activity' },
      { icon: <MessageSquare size={18} />, label: 'Support', tab: 'support' },
      { icon: <Settings size={18} />, label: 'Settings', tab: 'settings' },
    ]
  };

  

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">User Management</h2>
              <button 
                className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={currentPlan.currentUsers >= currentPlan.maxUsers}
              >
                <div className="flex items-center bg-black gap-2">
                  <UserPlus size={18} />
                  Add User
                </div>
              </button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>User Limit Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-400">
                    {currentPlan.currentUsers} of {currentPlan.maxUsers} users
                  </div>
                  <div className="text-sm text-gray-400">
                    {currentPlan.maxUsers - currentPlan.currentUsers} seats available
                  </div>
                </div>
                <div className="w-full bg-black rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(currentPlan.currentUsers / currentPlan.maxUsers) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <button className="text-blue-500 hover:text-blue-400">Edit</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        );

      case 'plan':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Plan & Billing</h2>
              <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <ArrowUpCircle size={18} />
                  Upgrade Plan
                </div>
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Plan Name</span>
                      <span className="text-white font-medium">{currentPlan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price</span>
                      <span className="text-white font-medium">{currentPlan.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Renewal Date</span>
                      <span className="text-white font-medium">{currentPlan.renewalDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                        {currentPlan.status}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payments.map(payment => (
                      <div key={payment.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800">
                        <div>
                          <div className="font-medium text-white">{payment.amount}</div>
                          <div className="text-sm text-gray-400">{payment.date}</div>
                        </div>
                        <button className="flex items-center gap-2 text-blue-500 hover:text-blue-400">
                          <Download size={16} />
                          Invoice
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">User Activity</h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>Logged in</TableCell>
                    <TableCell>2024-12-15 09:30 AM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>Updated profile</TableCell>
                    <TableCell>2024-12-15 10:15 AM</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Support</h2>
            <Card>
              <CardHeader>
                <CardTitle>Contact Super Admin</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Request to increase user limit"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Message
                    </label>
                    <textarea
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Describe your request..."
                    ></textarea>
                  </div>
                  <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Send Request
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Top Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">{currentPlan.name}</div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <Clock className="h-4 w-4" />
                    <p>Renews on {currentPlan.renewalDate}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm font-medium text-gray-400">Plan Features</div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="h-3 w-3 text-blue-400" />
                        <span className="text-xs">Up to {currentPlan.maxUsers} Users</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span className="text-xs">All Features</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
        
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">User Count</CardTitle>
                  <Users className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    {currentPlan.currentUsers}/{currentPlan.maxUsers}
                  </div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <UserCheck className="h-4 w-4" />
                    <p>Active users</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="text-sm font-medium text-gray-400">Usage</div>
                    <div className="mt-2 space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-xs text-gray-400">User Capacity</span>
                          <span className="text-xs text-gray-300">
                            {Math.round((currentPlan.currentUsers / currentPlan.maxUsers) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1">
                          <div 
                            className="bg-blue-500 h-1 rounded-full transition-all" 
                            style={{ width: `${(currentPlan.currentUsers / currentPlan.maxUsers) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
        
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                  <Wallet className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">₹19,996</div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <Calendar className="h-4 w-4" />
                    <p>Due on {currentPlan.renewalDate}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="text-sm font-medium text-gray-400">Payment Details</div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-gray-300">
                          <CreditCard className="h-3 w-3 text-gray-400" />
                          <span>Per User Cost</span>
                        </div>
                        <span className="text-gray-300">₹4,999</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
        
            {/* Quick Actions Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="flex items-center justify-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <UserPlus className="h-5 w-5 text-blue-400" />
                <span className="text-sm">Add User</span>
              </button>
              <button className="flex items-center justify-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <ArrowUpCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">Upgrade Plan</span>
              </button>
              <button className="flex items-center justify-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <FileText className="h-5 w-5 text-purple-400" />
                <span className="text-sm">View Invoices</span>
              </button>
              <button className="flex items-center justify-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <HelpCircle className="h-5 w-5 text-orange-400" />
                <span className="text-sm">Get Support</span>
              </button>
            </div>
        
            {/* Activity and User Stats */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                  <Activity className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { icon: UserPlus, text: 'New user added', time: '2 hours ago', color: 'text-blue-400' },
                      { icon: Receipt, text: 'Invoice generated', time: '4 hours ago', color: 'text-green-400' },
                      { icon: Settings, text: 'Settings updated', time: '6 hours ago', color: 'text-orange-400' },
                      { icon: Mail, text: 'Welcome email sent', time: '8 hours ago', color: 'text-purple-400' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`p-2 rounded-full bg-gray-800 ${activity.color}`}>
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-300">{activity.text}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
        
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">User Statistics</CardTitle>
                  <BarChart2 className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Active Sessions</span>
                        <span className="text-gray-300">12</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">API Usage</span>
                        <span className="text-gray-300">45%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Storage Used</span>
                        <span className="text-gray-300">75%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
        
            {/* Bottom Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">User Growth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">+12%</div>
                  <p className="text-gray-400 text-sm">Growth from last month</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center p-2 bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-400">New Users</span>
                      <span className="text-lg font-bold text-white">+5</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-400">Total Users</span>
                      <span className="text-lg font-bold text-white">47</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
        
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Support Status</CardTitle>
                  <LifeBuoy className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-gray-300">All systems operational</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Response Time</span>
                      <span className="text-green-400">2h avg</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Open Tickets</span>
                      <span className="text-gray-300">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
        
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Security Status</CardTitle>
                  <Shield className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-gray-300">All protections active</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>SSL Certificate Valid</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Firewall Enabled</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-gray-300">
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-800 flex flex-col">
        {/* Organization Name */}
        <div className="ml-8 p-4 border-b border-gray-800">
          <button className="flex items-center gap-2 text-white">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Organization Admin
            <Menu size={16} className="ml-auto" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div>
            <p className="text-xs text-gray-500 mb-4">{menuItems.heading}</p>
            <ul className="space-y-2">
              {menuItems.items.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setActiveTab(item.tab)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
                      activeTab === item.tab ? 'bg-gray-800 text-white' : 'text-gray-300'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Help Section */}
        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-gray-300">
            <HelpCircle size={18} />
            Help & Documentation
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-900 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="p-2 hover:border-white/10 rounded-lg transition-colors">
              <Moon size={18} />
            </button>
            <button onClick={handleLogout} className="flex justify-center items-center w-[8rem] h-8 bg-white text-black rounded-full"> Logout</button>
            <div className="w-8 h-8 overflow-hidden border border-white/10 rounded-full bg-gray-700"> <img src="/avatar-svgrepo-com.svg" alt="" /></div>
            
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
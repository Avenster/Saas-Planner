import React, { useState,useEffect } from 'react';
import { 
    User, CreditCard, Clock, Settings, Search, Moon, Menu, 
    HelpCircle, Shield, KeyRound, Mail, Activity, Circle,
    CheckCircle, Lock, Zap, FileText, BarChart2, Users
  } from 'lucide-react';
  import { 
     UserCheck,
    Wallet, Calendar,
    Building2, Boxes, AlertCircle
  } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";



const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
    const [userName, setUserName] = useState("");
    
      // Add this useEffect after your other useEffects
      useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) {
          setUserName(storedName);
        }
      }, []);

  // Sample data
  const userPlan = {
    name: 'Standard Plan',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    features: [
      'Access to all basic features',
      'Email support',
      'API access',
      'Custom integrations'
    ]
  };
  const currentPlan = {
    name: 'Standard Plan',
    renewalDate: '2024-12-31',
    maxUsers: 5,
    currentUsers: 4,
    totalCost: '₹19,996',
    status: 'Active',
    features: [
      'Basic Access',
      'API Access',
      'Standard Support'
    ]
  };

  const orderHistory = [
    { 
      id: 1, 
      date: '2024-01-01', 
      description: 'Standard Plan - Annual', 
      amount: '₹4,999',
      status: 'Active'
    },
    { 
      id: 2, 
      date: '2023-01-01', 
      description: 'Basic Plan - Annual', 
      amount: '₹2,999',
      status: 'Expired'
    }
  ];

  const menuItems = {
    heading: 'USER MENU',
    items: [
        { icon: <CreditCard size={18} />, label: 'Dashboard', tab: 'Dashboard' },
      { icon: <CreditCard size={18} />, label: 'Plan Details', tab: 'plan' },
      { icon: <Clock size={18} />, label: 'Order History', tab: 'orders' },
      { icon: <User size={18} />, label: 'Profile', tab: 'profile' },
    
    ]
  };

  const renderContent = () => {
    switch (activeTab) {
        
            
      case 'plan':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Your Plan</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Plan Name</span>
                      <span className="text-white font-medium">{userPlan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Start Date</span>
                      <span className="text-white">{userPlan.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">End Date</span>
                      <span className="text-white">{userPlan.endDate}</span>
                    </div>
                    <div className="pt-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Plan Features</h4>
                      <ul className="space-y-2">
                        {userPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-white">
                            <Shield size={14} className="text-blue-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Order History</h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderHistory.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="font-medium">{order.description}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Active' 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Profile Settings</h2>
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Profile Picture
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-700"></div>
                        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                          Change Avatar
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email Address
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue="john@example.com"
                        />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-lg font-medium text-white mb-4">Security</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <KeyRound size={20} className="text-gray-400" />
                          <div>
                            <div className="font-medium text-white">Password</div>
                            <div className="text-sm text-gray-400">Last changed 3 months ago</div>
                          </div>
                        </div>
                        <button className="text-blue-500 hover:text-blue-400">
                          Change
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail size={20} className="text-gray-400" />
                          <div>
                            <div className="font-medium text-white">Email Notifications</div>
                            <div className="text-sm text-gray-400">Manage email preferences</div>
                          </div>
                        </div>
                        <button className="text-blue-500 hover:text-blue-400">
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        );

        case 'Dashboard':
            return (
                <div className="space-y-6 mt-10">
                  <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                Welcome Back, {userName}
              </h2>
              <p className="text-gray-400 mt-1">
                Here's what's happening with your organizations today.
              </p>
            </div>
                  {/* Top Status Cards */}
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
                        <div className="mt-4 pt-4 border-t border-gray-800">
                          <div className="text-sm font-medium text-gray-400">Plan Status</div>
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 text-gray-300">
                              <Shield className="h-3 w-3 text-blue-400" />
                              <span className="text-xs">Standard Plan</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Users className="h-3 w-3 text-blue-400" />
                              <span className="text-xs">{currentPlan.maxUsers} Users Max</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
            
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Organization Status</CardTitle>
                        <Building2 className="h-4 w-4 text-gray-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white mb-2">{currentPlan.currentUsers} Active</div>
                        <div className="flex items-center text-green-400 space-x-2">
                          <CheckCircle className="h-4 w-4" />
                          <p>All systems operational</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-800">
                          <div className="text-sm font-medium text-gray-400">Resources</div>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Boxes className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-300">Storage Usage</span>
                              </div>
                              <span className="text-xs text-green-400">72% Available</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-300">API Limits</span>
                              </div>
                              <span className="text-xs text-green-400">Good Standing</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
            
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Usage Metrics</CardTitle>
                        <Activity className="h-4 w-4 text-gray-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white mb-2">₹19,996</div>
                        <div className="flex items-center text-gray-400 space-x-2">
                          <Clock className="h-4 w-4" />
                          <p>Next billing {currentPlan.renewalDate}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-800">
                          <div className="text-sm font-medium text-gray-400">Recent Changes</div>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-300">
                              <Circle className="h-2 w-2 fill-green-400" />
                              <span>New user added today</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-300">
                              <Circle className="h-2 w-2 fill-blue-400" />
                              <span>Storage upgraded 2 days ago</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
            
                  {/* Quick Actions and Usage */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                        <Zap className="h-4 w-4 text-gray-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">Add User</span>
                          </button>
                          <button className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                            <Shield className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">Permissions</span>
                          </button>
                          <button className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                            <CreditCard className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">Billing</span>
                          </button>
                          <button className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">Support</span>
                          </button>
                        </div>
                      </CardContent>
                    </Card>
            
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Resource Usage</CardTitle>
                        <BarChart2 className="h-4 w-4 text-gray-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-400">User Capacity</span>
                              <span className="text-gray-300">
                                {Math.round((currentPlan.currentUsers / currentPlan.maxUsers) * 100)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${(currentPlan.currentUsers / currentPlan.maxUsers) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-400">Storage Used</span>
                              <span className="text-gray-300">72%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-400">API Usage</span>
                              <span className="text-gray-300">45%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );

      default:
        return (
            <div className="space-y-6 mt-10">
              <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                Welcome Back, {userName}
              </h2>
              <p className="text-gray-400 mt-1">
                Here's what's happening with your organizations today.
              </p>
            </div>
              {/* Top Status Cards */}
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
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="text-sm font-medium text-gray-400">Plan Status</div>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Shield className="h-3 w-3 text-blue-400" />
                          <span className="text-xs">Standard Plan</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Users className="h-3 w-3 text-blue-400" />
                          <span className="text-xs">{currentPlan.maxUsers} Users Max</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
        
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Organization Status</CardTitle>
                    <Building2 className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-2">{currentPlan.currentUsers} Active</div>
                    <div className="flex items-center text-green-400 space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <p>All systems operational</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="text-sm font-medium text-gray-400">Resources</div>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Boxes className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-300">Storage Usage</span>
                          </div>
                          <span className="text-xs text-green-400">72% Available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-300">API Limits</span>
                          </div>
                          <span className="text-xs text-green-400">Good Standing</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
        
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Usage Metrics</CardTitle>
                    <Activity className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-2">₹19,996</div>
                    <div className="flex items-center text-gray-400 space-x-2">
                      <Clock className="h-4 w-4" />
                      <p>Next billing {currentPlan.renewalDate}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="text-sm font-medium text-gray-400">Recent Changes</div>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <Circle className="h-2 w-2 fill-green-400" />
                          <span>New user added today</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <Circle className="h-2 w-2 fill-blue-400" />
                          <span>Storage upgraded 2 days ago</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
        
              {/* Quick Actions and Usage */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                    <Zap className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Add User</span>
                      </button>
                      <button className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <Shield className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Permissions</span>
                      </button>
                      <button className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Billing</span>
                      </button>
                      <button className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Support</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
        
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Resource Usage</CardTitle>
                    <BarChart2 className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-400">User Capacity</span>
                          <span className="text-gray-300">
                            {Math.round((currentPlan.currentUsers / currentPlan.maxUsers) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(currentPlan.currentUsers / currentPlan.maxUsers) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-400">Storage Used</span>
                          <span className="text-gray-300">72%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-400">API Usage</span>
                          <span className="text-gray-300">45%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
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
        {/* User Info */}
        <div className="ml-8 p-4 border-b border-gray-800">
          <button className="flex items-center gap-2 text-white">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            John Doe
            
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
            Help Center
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-800 p-4 flex items-center justify-between">
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
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Moon size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
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

export default UserDashboard;
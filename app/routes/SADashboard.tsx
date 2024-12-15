import React, { useState , useEffect} from 'react';
import { 
  Settings, Home, FileText, BarChart3, CreditCard, Files,
  BookOpen, HelpCircle, Menu, Search, Moon, ClipboardList,
  Users, Building2, CreditCard as PaymentIcon, ShieldCheck, 
} from 'lucide-react';

import { SquareChartGantt } from 'lucide-react';
import { 
    Clock, 
    AlertTriangle,
    RefreshCcw, 
    Plus, 
    ArrowUp, 
    
  } from 'lucide-react';
  import {  Package, Briefcase, Crown, Check } from 'lucide-react';
  
import { NavLink } from "@remix-run/react";
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
import AdminModal from '~/components/AdminModal';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [organizationData, setOrganizationData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAdmin = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/api/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('User added successfully');
        setIsModalOpen(false);
      } else {
        alert(data.message || 'Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again.');
    }
  };
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dashboard-analytics');
        const result = await response.json();
        if (result.status === 'success') {
          setDashboardData(result.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/organization-summary');
        const result = await response.json();
        if (result.status === 'success') {
          setOrganizationData(result.data);
        }
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    };
  
    if (activeTab === 'organizations') {
      fetchOrganizationData();
    }
  }, [activeTab]);
  
  // Sample data - In real app, this would come from your backend
  const plans = [
    { id: 1, name: 'Basic', price: 'Free for 14 Days', maxUsers: 1, activeSubscriptions: 45 },
    { id: 2, name: 'Standard', price: '₹4,999/year', maxUsers: 5, activeSubscriptions: 28 },
    { id: 3, name: 'Plus', price: '₹3,999/year', minUsers: 10, activeSubscriptions: 12 }
  ];

  const organizations = [
    { id: 1, name: 'Acme Corp', plan: 'Standard', users: 4, status: 'Active', renewalDate: '2024-12-31' },
    { id: 2, name: 'TechStart', plan: 'Plus', users: 12, status: 'Active', renewalDate: '2025-01-15' },
    { id: 3, name: 'Dev Labs', plan: 'Basic', users: 1, status: 'Trial', renewalDate: '2024-12-22' }
  ];

  const payments = [
    { id: 1, org: 'Acme Corp', amount: '₹19,996', date: '2024-12-01', status: 'Successful' },
    { id: 2, org: 'TechStart', amount: '₹47,988', date: '2024-12-01', status: 'Successful' },
    { id: 3, org: 'Dev Labs', amount: '₹4,999', date: '2024-11-30', status: 'Failed' }
  ];

  const stats = {
    totalRevenue: '₹2,45,950',
    activeSubscriptions: 85,
    failedPayments: 3,
    totalOrgs: 32
  };

  const menuItems = {
    heading: 'ADMIN',
    items: [
      { icon: <BarChart3 size={18} />, label: 'Overview', tab: 'overview' },
      { icon: <SquareChartGantt size={18} />, label: 'Plans', tab: 'plans' },
      { icon: <Building2 size={18} />, label: 'Organizations', tab: 'organizations' },
      { icon: <PaymentIcon size={18} />, label: 'Payments', tab: 'payments' },
      { icon: <ShieldCheck size={18} />, label: 'Admins', tab: 'admins' },
    ]
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">₹{dashboardData?.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-gray-400">+20.1% from last month</p>
                </CardContent>
              </Card>
      
              <Card className="p-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Organizations</CardTitle>
                  <Building2 className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{dashboardData?.activeOrganizations}</div>
                  <p className="text-xs text-gray-400">+3 new this month</p>
                </CardContent>
              </Card>
      
              <Card className="p-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{dashboardData?.totalUsers}</div>
                  <p className="text-xs text-gray-400">+12 since last month</p>
                </CardContent>
              </Card>
      
              <Card className="p-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{dashboardData?.failedPayments}</div>
                  <p className="text-xs text-gray-400">-2 from last month</p>
                </CardContent>
              </Card>
            </div>
      
            {/* Plan Distribution section */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-6">
                <CardHeader className="p-0">
                  <h3 className="text-lg font-semibold text-white">Plan Distribution</h3>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {dashboardData?.planDistribution && Object.entries(dashboardData.planDistribution).map(([plan, count]) => (
                      <div key={plan}>
                        <div className="flex justify-between mb-2">
                          <span>{plan} Plan</span>
                          <span>{count} subscriptions</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              plan === 'Basic' ? 'bg-blue-500' : 
                              plan === 'Standard' ? 'bg-green-500' : 
                              'bg-purple-500'
                            }`} 
                            style={{ width: `${(count / Object.values(dashboardData.planDistribution).reduce((a, b) => a + b, 0)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
      
              {/* Recent Organizations section */}
              <Card className="p-6">
                <CardHeader className="p-0">
                  <h3 className="text-lg font-semibold text-white">Recent Organizations</h3>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {dashboardData?.recentOrganizations.map((org, index) => (
                      <div key={org.id} className="flex justify-between items-center">
                        <div>
                          <p className="text-white">{org.organizationName}</p>
                          
                        </div>
                        
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
      
              {/* Recent Payments section */}
              <Card className="p-6">
                <CardHeader className="p-0">
                  <h3 className="text-lg font-semibold text-white">Recent Payments</h3>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {dashboardData?.recentPayments.map((payment, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="text-white">{payment.planName} Plan</p>
                          <p className="text-sm text-gray-400">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">₹{payment.amount.toLocaleString()}</p>
                          <p className={`text-xs ${payment.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {payment.amount > 0 ? 'Successful' : 'Failed'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
  
  case 'plans':
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Subscription Plans</h2>
          <p className="text-gray-400 mt-1">Manage your subscription plans and pricing</p>
        </div>
        <button className="bg-white hover:bg-gray-100 text-black px-6 py-2.5 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
          <Plus size={18} />
          Add New Plan
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Basic Plan */}
        <div className="relative rounded-2xl bg-gradient-to-b from-gray-900 to-black p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Popular tag */}
          {/* <div className="absolute -top-3 right-6 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div> */}

          <div className="space-y-6 relative">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Package size={20} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Basic</h3>
              </div>

              <div className="space-y-2">
                <h4 className="text-3xl font-bold text-white">Free for 14 Days</h4>
                <p className="text-gray-400 text-lg">Up to 1 user</p>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Check size={18} className="text-blue-400" />
                  <span>Basic features included</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check size={18} className="text-blue-400" />
                  <span>Email support</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check size={18} className="text-blue-400" />
                  <span>1GB storage</span>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Active Subscriptions</span>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-blue-400" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    45
                  </span>
                </div>
              </div>
              <button className="w-full bg-blue-900/20 hover:bg-blue-500/30 text-blue-400 py-2 rounded-lg transition-colors duration-200">
                Edit Plan
              </button>
            </div>
          </div>
        </div>

        {/* Standard Plan */}
        <div className="relative rounded-2xl bg-gradient-to-b from-gray-900 to-black p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="space-y-6 relative">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Briefcase size={20} className="text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Standard</h3>
              </div>

              <div className="space-y-2">
                <h4 className="text-3xl font-bold text-white">₹4,999/year</h4>
                <p className="text-gray-400 text-lg">Up to 5 users</p>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Check size={18} className="text-green-400" />
                  <span>All Basic features</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check size={18} className="text-green-400" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check size={18} className="text-green-400" />
                  <span>5GB storage per user</span>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Active Subscriptions</span>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-green-400" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    28
                  </span>
                </div>
              </div>
              <button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 rounded-lg transition-colors duration-200">
                Edit Plan
              </button>
            </div>
          </div>
        </div>

        {/* Plus Plan */}
        <div className="relative rounded-2xl bg-gradient-to-b from-gray-900 to-black p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Best value tag */}
          {/* <div className="absolute -top-3 right-6 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Best Value
          </div> */}

          <div className="space-y-6 relative">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Crown size={20} className="text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Plus</h3>
              </div>

              <div className="space-y-2">
                <h4 className="text-3xl font-bold text-white">₹3,999/year</h4>
                <p className="text-gray-400 text-lg">Minimum 10 users</p>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Check size={18} className="text-orange-400" />
                  <span>All Standard features</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check size={18} className="text-orange-400" />
                  <span>24/7 support</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check size={18} className="text-orange-400" />
                  <span>10GB storage per user</span>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Active Subscriptions</span>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-orange-400" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    12
                  </span>
                </div>
              </div>
              <button className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 py-2 rounded-lg transition-colors duration-200">
                Edit Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  case 'organizations':
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Organizations</h2>
          <div className="flex gap-2">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Export
            </button>
            <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Add Organization
            </button>
          </div>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizationData?.organizationSummary.map((org, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{org.Organization}</TableCell>
                  <TableCell>{org.Plan}</TableCell>
                  <TableCell>{org.Users}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      org.Status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {org.Status}
                    </span>
                  </TableCell>
                  <TableCell>{org["Renewal Date"]}</TableCell>
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
    case 'payments':
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Payment Logs</h2>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Export Logs
            </button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Renewal Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organizationData?.allTransactions.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{payment["Organisation Name"]}</TableCell>
                    <TableCell>{payment["Plan Name"]}</TableCell>
                    <TableCell>₹{payment.Amount.toLocaleString()}</TableCell>
                    <TableCell>{payment.Date}</TableCell>
                    <TableCell>{payment["Renewal Date"]}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payment["Payment Status"] ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {payment["Payment Status"] ? 'Successful' : 'Failed'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-blue-500 hover:text-blue-400">View</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      );
      // Replace the admins case in renderContent
case 'admins':
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Admin Management</h2>
        <button 
        className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        Add Admin
      </button>
    </div>
    <AdminModal 
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleAddAdmin}
    />
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizationData?.users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  <button className="text-blue-500 hover:text-blue-400 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-400">Remove</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
    }
  };

  return (
    <div className="flex h-screen bg-black text-gray-300">
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-800 flex flex-col">
        {/* Project selector */}
        <div className="ml-8 p-4 border-b border-gray-800">
          <button className="flex items-center gap-2 text-white">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Admin Dashboard
            
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

export default Dashboard;
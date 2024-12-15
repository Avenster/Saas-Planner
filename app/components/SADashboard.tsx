import React, { useState } from 'react';
import { 
  Settings, Home, FileText, BarChart3, CreditCard, Files,
  BookOpen, HelpCircle, Menu, Search, Moon, ClipboardList,
  Users, Building2, CreditCard as PaymentIcon, ShieldCheck
} from 'lucide-react';
import { NavLink } from "@remix-run/react";
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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - In real app, this would come from your backend
  const plans = [
    { id: 1, name: 'Basic', price: 'Free for 14 Days', maxUsers: 1, activeSubscriptions: 45 },
    { id: 2, name: 'Standard', price: '₹4,999/year/user', maxUsers: 5, activeSubscriptions: 28 },
    { id: 3, name: 'Plus', price: '₹3,999/year/user', minUsers: 10, activeSubscriptions: 12 }
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
      { icon: <CreditCard size={18} />, label: 'Plans', tab: 'plans' },
      { icon: <Building2 size={18} />, label: 'Organizations', tab: 'organizations' },
      { icon: <PaymentIcon size={18} />, label: 'Payments', tab: 'payments' },
      { icon: <ShieldCheck size={18} />, label: 'Admins', tab: 'admins' },
    ]
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalRevenue}</div>
                <p className="text-xs text-gray-400">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <Users className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.activeSubscriptions}</div>
                <p className="text-xs text-gray-400">+12 since last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
                <PaymentIcon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.failedPayments}</div>
                <p className="text-xs text-gray-400">-2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
                <Building2 className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalOrgs}</div>
                <p className="text-xs text-gray-400">+3 new this month</p>
              </CardContent>
            </Card>
          </div>
        );

      case 'plans':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Subscription Plans</h2>
              <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Add New Plan
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {plans.map(plan => (
                <Card key={plan.id}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-white mb-2">{plan.price}</p>
                    <p className="text-gray-400 mb-4">
                      {plan.maxUsers ? `Up to ${plan.maxUsers} users` : `Minimum ${plan.minUsers} users`}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Active Subscriptions</span>
                      <span className="text-white font-medium">{plan.activeSubscriptions}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                  {organizations.map(org => (
                    <TableRow key={org.id}>
                      <TableCell className="font-medium">{org.name}</TableCell>
                      <TableCell>{org.plan}</TableCell>
                      <TableCell>{org.users}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          org.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {org.status}
                        </span>
                      </TableCell>
                      <TableCell>{org.renewalDate}</TableCell>
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
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map(payment => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.org}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.status === 'Successful' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                        }`}>
                          {payment.status}
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

      case 'admins':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Admin Management</h2>
              <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Add Admin
              </button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-400">
                  <ShieldCheck className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Admin Management Coming Soon</h3>
                  <p>This feature is currently under development.</p>
                </div>
              </CardContent>
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
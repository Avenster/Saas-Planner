import React, { useState, useEffect } from "react";
import {
  Settings,
  Home,
  FileText,
  BarChart3,
  CreditCard,
  Files,
  BookOpen,
  HelpCircle,
  Menu,
  Search,
  Moon,
  ClipboardList,
  Users,
  Building2,
  CreditCard as PaymentIcon,
  ShieldCheck,
} from "lucide-react";

import { SquareChartGantt } from "lucide-react";
import { Clock, AlertTriangle, RefreshCcw, Plus, ArrowUp } from "lucide-react";
import { Package, Briefcase, Crown, Check } from "lucide-react";

import { NavLink, useNavigate } from "@remix-run/react";
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
import AdminModal from "~/components/AdminModal";
import AddPlanModal from "~/components/AddPlanModal";
import plansData from "../../Files/plans.json";
import EditPlanModal from "~/components/EditPlanModal";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboardData, setDashboardData] = useState(null);
  const [organizationData, setOrganizationData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalStorage("token");
    removeLocalStorage("userName");
    navigate("/Login");
  };
  const removeLocalStorage = (key: string): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };

  const [userName, setUserName] = useState("");

  // Add this useEffect after your other useEffects
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleAddAdmin = async (formData) => {
    try {
      const response = await fetch("http://localhost:8000/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User added successfully");
        setIsModalOpen(false);
      } else {
        alert(data.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/dashboard-analytics"
        );
        const result = await response.json();
        if (result.status === "success") {
          setDashboardData(result.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/organization-summary"
        );
        const result = await response.json();
        if (result.status === "success") {
          setOrganizationData(result.data);
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };

    if (activeTab === "organizations") {
      fetchOrganizationData();
    }
  }, [activeTab]);

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const handleAddPlan = (planData) => {
    console.log("New plan:", planData);
    setIsPlanModalOpen(false);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Add this handler function
  const handleEditPlan = (updatedPlan) => {
    // Here you would typically make an API call to update the plan
    console.log("Updated plan:", updatedPlan);
    // Update the plans in your state/database
    setIsEditModalOpen(false);
  };

  

  const menuItems = {
    heading: "ADMIN",
    items: [
      { icon: <BarChart3 size={18} />, label: "Overview", tab: "overview" },
      { icon: <SquareChartGantt size={18} />, label: "Plans", tab: "plans" },
      {
        icon: <Building2 size={18} />,
        label: "Organizations",
        tab: "organizations",
      },
      { icon: <PaymentIcon size={18} />, label: "Payments", tab: "payments" },
      { icon: <ShieldCheck size={18} />, label: "Admins", tab: "admins" },
    ],
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                Welcome Back, {userName}
              </h2>
              <p className="text-gray-400 mt-1">
                Here's what's happening with your organizations today.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    ₹{dashboardData?.totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-400">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Organizations
                  </CardTitle>
                  <Building2 className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {dashboardData?.activeOrganizations}
                  </div>
                  <p className="text-xs text-gray-400">+3 new this month</p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {dashboardData?.totalUsers}
                  </div>
                  <p className="text-xs text-gray-400">+12 since last month</p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Failed Payments
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {dashboardData?.failedPayments}
                  </div>
                  <p className="text-xs text-gray-400">-2 from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Plan Distribution section */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-6">
                <CardHeader className="p-0">
                  <h3 className="text-lg font-semibold text-white">
                    Plan Distribution
                  </h3>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {dashboardData?.planDistribution &&
                      Object.entries(dashboardData.planDistribution).map(
                        ([plan, count]) => (
                          <div key={plan}>
                            <div className="flex justify-between mb-2">
                              <span>{plan} Plan</span>
                              <span>{count} subscriptions</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  plan === "Basic"
                                    ? "bg-blue-500"
                                    : plan === "Standard"
                                    ? "bg-green-500"
                                    : "bg-purple-500"
                                }`}
                                style={{
                                  width: `${
                                    (count /
                                      Object.values(
                                        dashboardData.planDistribution
                                      ).reduce((a, b) => a + b, 0)) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Organizations section */}
              <Card className="p-6">
                <CardHeader className="p-0">
                  <h3 className="text-lg font-semibold text-white">
                    Recent Organizations
                  </h3>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {dashboardData?.recentOrganizations.map((org, index) => (
                      <div
                        key={org.id}
                        className="flex justify-between items-center"
                      >
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
                  <h3 className="text-lg font-semibold text-white">
                    Recent Payments
                  </h3>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {dashboardData?.recentPayments.map((payment, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="text-white">{payment.planName} Plan</p>
                          <p className="text-sm text-gray-400">
                            {payment.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">
                            ₹{payment.amount.toLocaleString()}
                          </p>
                          <p
                            className={`text-xs ${
                              payment.amount > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {payment.amount > 0 ? "Successful" : "Failed"}
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

      case "plans":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Subscription Plans
                </h2>
                <p className="text-gray-400 mt-1">
                  Manage your subscription plans and pricing
                </p>
              </div>
              <button
                onClick={() => setIsPlanModalOpen(true)}
                className="bg-white hover:bg-gray-100 text-black px-6 py-2.5 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Plus size={18} />
                Add New Plan
              </button>
            </div>

            {/* Plans Grid - Updated with smaller boxes */}
            <div className="grid grid-cols-3 gap-4">
              {plansData.plans.map((plan) => (
                <div
                  key={plan.name}
                  className="relative rounded-2xl bg-black border border-blue-500/20 p-6 group hover:border-blue-500/40 transition-all duration-300"
                >
                  {/* Title */}
                  <h3 className="text-gray-400 text-lg mb-4">{plan.name}</h3>

                  {/* Pricing */}
                  <div className="space-y-1 mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">
                        {plan.price === 0
                          ? "Free"
                          : `₹${plan.price.toLocaleString()}`}
                      </span>
                      {plan.price !== 0 && (
                        <span className="text-gray-400 ml-2">/year</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{plan.subcontent}</p>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-white text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div>
                    <button
                      onClick={() => {
                        setSelectedPlan(plan);
                        setIsEditModalOpen(true);
                      }}
                      className="w-full bg-white hover:bg-gray-100 text-black py-2.5 rounded-full text-sm font-medium transition-all duration-200"
                    >
                      Edit Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <EditPlanModal
              open={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedPlan(null);
              }}
              onSubmit={handleEditPlan}
              plan={selectedPlan}
            />

            {/* Add Plan Modal */}
            <AddPlanModal
              open={isPlanModalOpen}
              onClose={() => setIsPlanModalOpen(false)}
              onSubmit={handleAddPlan}
            />
          </div>
        );

      case "organizations":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-m font-bold text-white">Organizations</h2>
              <div className="flex gap-2">
                <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
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
                      <TableCell className="font-medium">
                        {org.Organization}
                      </TableCell>
                      <TableCell>{org.Plan}</TableCell>
                      <TableCell>{org.Users}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            org.Status === "Active"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-yellow-500/20 text-yellow-500"
                          }`}
                        >
                          {org.Status}
                        </span>
                      </TableCell>
                      <TableCell>{org["Renewal Date"]}</TableCell>
                      <TableCell className="text-right">
                        <button className="bg-white rounded-xl px-5 py-1 text-black">
                          Edit
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        );
      case "payments":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-m font-bold text-white">Payment Logs</h2>
              <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
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
                      <TableCell className="font-medium">
                        {payment["Organisation Name"]}
                      </TableCell>
                      <TableCell>{payment["Plan Name"]}</TableCell>
                      <TableCell>₹{payment.Amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.Date}</TableCell>
                      <TableCell>{payment["Renewal Date"]}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            payment["Payment Status"]
                              ? "bg-green-500/20 text-green-500"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {payment["Payment Status"] ? "Successful" : "Failed"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <button className="bg-white text-black px-4 rounded-xl py-1">
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        );
      // Replace the admins case in renderContent
      case "admins":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-m font-bold text-white">Admin Management</h2>
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
                      <TableCell className="text-right gap-2 flex justify-between">
                        <button className="bg-white text-black px-6 py-1 rounded-xl">
                          Edit
                        </button>
                        <button className="ml-2 bg-black text-white px-3 py-1 rounded-xl border border-white/10">
                          Remove
                        </button>
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
      <div className="w-72 border-r border-white/10 flex flex-col">
        {/* Project selector */}
        <div className="h-[4.5rem] flex items-center justify-between p-4 border-b border-white/10">
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
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors ${
                      activeTab === item.tab
                        ? "bg-white/10 text-white"
                        : "text-gray-300"
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
        <header className="h-[4.5rem]  border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-black-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Moon size={18} />
            </button>
            <button
              onClick={handleLogout}
              className="flex justify-center items-center w-[8rem] h-8 bg-white text-black rounded-full"
            >
              {" "}
              Logout
            </button>
            <div className="w-8 h-8 overflow-hidden border border-white/10 rounded-full bg-gray-700">
              {" "}
              <img src="/avatar-svgrepo-com.svg" alt="" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

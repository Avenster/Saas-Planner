import React, { useState, useEffect } from "react";
import {
  User,
  CreditCard,
  Clock,
  Settings,
  Search,
  Moon,
  Menu,
  HelpCircle,
  Shield,
  KeyRound,
  Mail,
  Activity,
  Circle,
  CheckCircle,
  Lock,
  Zap,
  FileText,
  BarChart2,
  Users,
} from "lucide-react";
import {
  UserCheck,
  Wallet,
  Calendar,
  Building2,
  Boxes,
  AlertCircle,
} from "lucide-react";
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
import plansData from "../../Files/plans.json";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userName, setUserName] = useState("");

  // Add this useEffect after your other useEffects
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Sample data
  // const userPlan = {
  //   name: "Standard Plan",
  //   startDate: "2024-01-01",
  //   endDate: "2024-12-31",
  //   features: [
  //     "Access to all basic features",
  //     "Email support",
  //     "API access",
  //     "Custom integrations",
  //   ],
  // };
  // const currentPlan = {
  //   name: "Standard Plan",
  //   renewalDate: "2024-12-31",
  //   maxUsers: 5,
  //   currentUsers: 4,
  //   totalCost: "₹19,996",
  //   status: "Active",
  //   features: ["Basic Access", "API Access", "Standard Support"],
  // };

  // const orderHistory = [
  //   {
  //     id: 1,
  //     date: "2024-01-01",
  //     description: "Standard Plan - Annual",
  //     amount: "₹4,999",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     date: "2023-01-01",
  //     description: "Basic Plan - Annual",
  //     amount: "₹2,999",
  //     status: "Expired",
  //   },
  // ];

  const menuItems = {
    heading: "USER MENU",
    items: [
      { icon: <CreditCard size={18} />, label: "Dashboard", tab: "Dashboard" },
      { icon: <CreditCard size={18} />, label: "Plan Details", tab: "plan" },
      { icon: <Clock size={18} />, label: "Order History", tab: "orders" },
      { icon: <User size={18} />, label: "Profile", tab: "profile" },
    ],
  };

  const [dashboardData, setDashboardData] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        try {
          // Include the userName in the URL
          const response = await fetch(
            `http://localhost:8000/api/user-dashboard/${storedName}`
          );
          const data = await response.json();
          if (data.status === "success") {
            setDashboardData(data.data);
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();
  }, []);

  const [planFeatures, setPlanFeatures] = useState([]);
  useEffect(() => {
    const currentPlan = plansData.plans.find(
      (plan) => plan.name === (dashboardData?.planName || "STANDARD")
    );

    if (currentPlan) {
      setPlanFeatures(currentPlan.features);
    }
  }, [dashboardData?.planName]);

  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/order-history/${storedName}`
          );
          const data = await response.json();
          if (data.status === "success") {
            setOrderHistory(data.data);
          }
        } catch (error) {
          console.error("Error fetching order history:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrderHistory();
  }, []);

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/user-profile/${storedName}`
          );
          const data = await response.json();
          if (data.status === "success") {
            setUserProfile(data.data);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "plan":
        return (
          <div className="space-y-4 p-6">
            <h2 className="text-xl font-bold text-white">Your Plan</h2>
            <div className="flex items-center justify-center p-8">
              <div className="relative w-full max-w-md">
                {/* Card with gradient border */}
                <div className="relative rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-[1px]">
                  <div className="rounded-3xl bg-black p-8">
                    {/* Plan name */}
                    <div className="mb-4">
                      <h3 className="text-gray-400 text-xl">
                        {dashboardData?.planName || "STANDARD"}
                      </h3>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-white">
                          ₹{dashboardData?.amount || "4999"}
                        </span>
                        <span className="ml-2 text-gray-400">/year</span>
                      </div>
                      <p className="mt-2 text-gray-400">
                        Up to{" "}
                        {dashboardData?.planName === "Basic"
                          ? "1"
                          : dashboardData?.planName === "Standard"
                          ? "5"
                          : "10+"}{" "}
                        users (₹
                        {(dashboardData?.amount || 4999) *
                          (dashboardData?.planName === "Basic"
                            ? 1
                            : dashboardData?.planName === "Standard"
                            ? 5
                            : 10)}{" "}
                        yearly)
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="space-y-4 mt-8">
                      {planFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-blue-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Upgrade button */}
                    {/* <div className="mt-8">
                      <button className="w-full rounded-full bg-white py-4 text-center text-black font-semibold hover:bg-gray-100 transition-colors">
                        Upgrade
                      </button>
                    </div> */}

                    {/* Plan info */}
                    <div className="mt-6">
                      <div className="rounded-lg bg-gray-900 p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Current Period
                            </span>
                            <span className="text-gray-300">
                              {dashboardData?.date
                                ? new Date(
                                    dashboardData.date
                                  ).toLocaleDateString()
                                : "N/A"}{" "}
                              -
                              {dashboardData?.renewalDate
                                ? new Date(
                                    dashboardData.renewalDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Status</span>
                            <span
                              className={`${
                                dashboardData?.paymentStatus
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {dashboardData?.paymentStatus
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Users</span>
                            <span className="text-gray-300">
                              {dashboardData?.user_num || 0} / 5
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Order History</h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Renewal Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : orderHistory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No order history found
                      </TableCell>
                    </TableRow>
                  ) : (
                    orderHistory.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(order.Date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          {order["Plan Name"]}
                        </TableCell>
                        <TableCell>₹{order.Amount}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order["Payment Status"]
                                ? "bg-green-500/20 text-green-500"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {order["Payment Status"] ? "Success" : "Failed"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(order["Renewal Date"]).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        );

      case "profile":
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
                        defaultValue={userProfile?.name || ""}
                        placeholder="Loading..."
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
                          defaultValue={userProfile?.email || ""}
                          placeholder="Loading..."
                        />
                        
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-lg font-medium text-white mb-4">
                      Security
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <KeyRound size={20} className="text-gray-400" />
                          <div>
                            <div className="font-medium text-white">
                              Password
                            </div>
                            <div className="text-sm text-gray-400">
                              Last changed 3 months ago
                            </div>
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
                            <div className="font-medium text-white">
                              Email Notifications
                            </div>
                            <div className="text-sm text-gray-400">
                              Manage email preferences
                            </div>
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

      case "Dashboard":
        return (
          <div className="space-y-6 mt-10">
            {/* Welcome Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                Welcome Back, {userName}
              </h2>
              <p className="text-gray-400 mt-1">
                Here's what's happening with your organization today.
              </p>
            </div>

            {/* Top Status Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Current Plan Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Plan
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    {dashboardData?.planName || "Loading..."}
                  </div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <Clock className="h-4 w-4" />
                    <p>
                      Renews on {dashboardData?.renewalDate || "Loading..."}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="text-sm font-medium text-gray-400">
                      Plan Status
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Shield className="h-3 w-3 text-blue-400" />
                        <span className="text-xs">
                          {dashboardData?.planName || "Loading..."}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="h-3 w-3 text-blue-400" />
                        <span className="text-xs">
                          {dashboardData?.user_num || 0} Users
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Organization Status Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Organization Status
                  </CardTitle>
                  <Building2 className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    {dashboardData?.user_num || 0} Active Users
                  </div>
                  <div className="flex items-center text-green-400 space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <p>All systems operational</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="text-sm font-medium text-gray-400">
                      Resources
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Boxes className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-300">
                            Organization
                          </span>
                        </div>
                        <span className="text-xs text-green-400">
                          {dashboardData?.organizationName || "Loading..."}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-300">Status</span>
                        </div>
                        <span className="text-xs text-green-400">
                          {dashboardData?.paymentStatus ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Metrics Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Usage Metrics
                  </CardTitle>
                  <Activity className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    ₹{dashboardData?.amount || "0"}
                  </div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <Clock className="h-4 w-4" />
                    <p>
                      Next billing {dashboardData?.renewalDate || "Loading..."}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="text-sm font-medium text-gray-400">
                      Recent Activity
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Circle className="h-2 w-2 fill-green-400" />
                        <span>
                          Last Payment: {dashboardData?.date || "Loading..."}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Circle className="h-2 w-2 fill-blue-400" />
                        <span>
                          Plan: {dashboardData?.planName || "Loading..."}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions and Usage */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Quick Actions Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Quick Actions
                  </CardTitle>
                  <Zap className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Edit User Profile</span>
                    </button>
                    <button className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Plans</span>
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

              {/* Resource Usage Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Resource Usage
                  </CardTitle>
                  <BarChart2 className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">User Capacity</span>
                        <span className="text-gray-300">
                          {dashboardData
                            ? `${(
                                (dashboardData.user_num /
                                  (dashboardData.planName === "Basic"
                                    ? 1
                                    : dashboardData.planName === "Standard"
                                    ? 5
                                    : 10)) *
                                100
                              ).toFixed(1)}%`
                            : "0%"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: dashboardData
                              ? `${
                                  (dashboardData.user_num /
                                    (dashboardData.planName === "Basic"
                                      ? 1
                                      : dashboardData.planName === "Standard"
                                      ? 5
                                      : 10)) *
                                  100
                                }%`
                              : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Plan Duration</span>
                        <span className="text-gray-300">
                          {dashboardData?.paymentStatus ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: dashboardData?.paymentStatus ? "100%" : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Payment Status</span>
                        <span className="text-gray-300">
                          {dashboardData?.paymentStatus ? "Paid" : "Pending"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: dashboardData?.paymentStatus ? "100%" : "0%",
                          }}
                        ></div>
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
            {/* Welcome Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                Welcome Back, {userName}
              </h2>
              <p className="text-gray-400 mt-1">
                Here's what's happening with your organization today.
              </p>
            </div>

            {/* Top Status Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Current Plan Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Plan
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    {dashboardData?.planName || "Loading..."}
                  </div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <Clock className="h-4 w-4" />
                    <p>
                      Renews on {dashboardData?.renewalDate || "Loading..."}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="text-sm font-medium text-gray-400">
                      Plan Status
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Shield className="h-3 w-3 text-blue-400" />
                        <span className="text-xs">
                          {dashboardData?.planName || "Loading..."}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="h-3 w-3 text-blue-400" />
                        <span className="text-xs">
                          {dashboardData?.user_num || 0} Users
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Organization Status Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Organization Status
                  </CardTitle>
                  <Building2 className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    {dashboardData?.user_num || 0} Active Users
                  </div>
                  <div className="flex items-center text-green-400 space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <p>All systems operational</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="text-sm font-medium text-gray-400">
                      Resources
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Boxes className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-300">
                            Organization
                          </span>
                        </div>
                        <span className="text-xs text-green-400">
                          {dashboardData?.organizationName || "Loading..."}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-300">Status</span>
                        </div>
                        <span className="text-xs text-green-400">
                          {dashboardData?.paymentStatus ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Metrics Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Usage Metrics
                  </CardTitle>
                  <Activity className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    ₹{dashboardData?.amount || "0"}
                  </div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <Clock className="h-4 w-4" />
                    <p>
                      Next billing {dashboardData?.renewalDate || "Loading..."}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="text-sm font-medium text-gray-400">
                      Recent Activity
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Circle className="h-2 w-2 fill-green-400" />
                        <span>
                          Last Payment: {dashboardData?.date || "Loading..."}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Circle className="h-2 w-2 fill-blue-400" />
                        <span>
                          Plan: {dashboardData?.planName || "Loading..."}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions and Usage */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Quick Actions Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Quick Actions
                  </CardTitle>
                  <Zap className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Edit User Profile</span>
                    </button>
                    <button className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Plans</span>
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

              {/* Resource Usage Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Resource Usage
                  </CardTitle>
                  <BarChart2 className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">User Capacity</span>
                        <span className="text-gray-300">
                          {dashboardData
                            ? `${(
                                (dashboardData.user_num /
                                  (dashboardData.planName === "Basic"
                                    ? 1
                                    : dashboardData.planName === "Standard"
                                    ? 5
                                    : 10)) *
                                100
                              ).toFixed(1)}%`
                            : "0%"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: dashboardData
                              ? `${
                                  (dashboardData.user_num /
                                    (dashboardData.planName === "Basic"
                                      ? 1
                                      : dashboardData.planName === "Standard"
                                      ? 5
                                      : 10)) *
                                  100
                                }%`
                              : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Plan Duration</span>
                        <span className="text-gray-300">
                          {dashboardData?.paymentStatus ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: dashboardData?.paymentStatus ? "100%" : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Payment Status</span>
                        <span className="text-gray-300">
                          {dashboardData?.paymentStatus ? "Paid" : "Pending"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: dashboardData?.paymentStatus ? "100%" : "0%",
                          }}
                        ></div>
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
            {userName}
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
                      activeTab === item.tab
                        ? "bg-gray-800 text-white"
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
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
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
          <div className="max-w-6xl mx-auto space-y-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;

import React from "react";
import {
  Users,
  CreditCard,
  Clock,
  FileText,
  Settings,
  Search,
  Moon,
  Menu,
  HelpCircle,
  Download,
  UserPlus,
  MessageSquare,
  ArrowUpCircle,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import {
  CheckCircle,
  UserCheck,
  Circle,
  Wallet,
  Calendar,
  Activity,
  BarChart2,
  TrendingUp,
  LifeBuoy,
  Shield,
  Mail,
  Receipt,
  Gauge,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select } from "~/components/ui/select";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
  status: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface CurrentPlan {
  name: string;
  startDate: string;
  endDate: string;
  maxUsers: number;
  currentUsers: number;
  price: string;
  status: string;
  renewalDate: string;
}

interface Payment {
  id: number;
  date: string;
  amount: string;
  status: string;
  invoice: string;
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500 bg-red-100 rounded">
          Something went wrong. Please try refreshing the page.
        </div>
      );
    }
    return this.props.children;
  }
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const [orgDetails, setOrgDetails] = useState<any>(null);

  useEffect(() => {
    const fetchOrgDetails = async () => {
      if (!userName) return;

      try {
        const response = await fetch(
          `http://localhost:8000/api/organization-details/${userName}`,
          {
            headers: {
              Authorization: token || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch organization details");
        }

        const data = await response.json();
        setOrgDetails(data.data);
      } catch (err) {
        console.error("Error fetching organization details:", err);
      }
    };

    if (userName) {
      fetchOrgDetails();
    }
  }, [userName]);

  const navigate = useNavigate();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getLocalStorage = (key: string): string | null => {
    if (typeof window !== "undefined" && isClient) {
      return localStorage.getItem(key);
    }
    return null;
  };

  const removeLocalStorage = (key: string): void => {
    if (typeof window !== "undefined" && isClient) {
      localStorage.removeItem(key);
    }
  };

  const token = getLocalStorage("token");

  const handleLogout = () => {
    if (isClient) {
      removeLocalStorage("token");
      removeLocalStorage("userName");
      navigate("/Login");
    }
  };

  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!userName) return;

      try {
        const response = await fetch(
          `http://localhost:8000/api/payment-history/${encodeURIComponent(
            userName
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payment history");
        }
        const data = await response.json();
        setPaymentHistory(data.data);
      } catch (err) {
        console.error("Error fetching payment history:", err);
      }
    };

    if (userName) {
      fetchPaymentHistory();
    }
  }, [userName]);

  const currentPlan: CurrentPlan = {
    name: "Standard",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    maxUsers: 5,
    currentUsers: 4,
    price: "₹4,999/user/year",
    status: "Active",
    renewalDate: "2024-12-31",
  };

  const payments = [
    {
      id: 1,
      date: "2024-12-01",
      amount: "₹19,996",
      status: "Paid",
      invoice: "INV-2024-001",
    },
    {
      id: 2,
      date: "2024-11-01",
      amount: "₹19,996",
      status: "Paid",
      invoice: "INV-2024-002",
    },
  ];

  const menuItems = {
    heading: "ADMIN PORTAL",
    items: [
      { icon: <Gauge size={18} />, label: "Dashboard", tab: "Dashboard" },
      { icon: <Users size={18} />, label: "User Management", tab: "users" },
      { icon: <CreditCard size={18} />, label: "Plan & Billing", tab: "plan" },

      { icon: <MessageSquare size={18} />, label: "Support", tab: "support" },
    ],
  };

  const fetchUsers = async () => {
    if (!token || !userName) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/users?orgName=${encodeURIComponent(
          userName
        )}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
          return;
        }
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isClient && token) {
      fetchUsers();
    }
  }, [isClient, token]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !userName || !orgDetails) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/users?orgName=${encodeURIComponent(
          userName
        )}&planName=${encodeURIComponent(orgDetails["Plan Name"])}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add user");
      }

      await fetchUsers();
      setIsAddUserOpen(false);
      setFormData({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedUser || !userName) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${
          selectedUser._id
        }?orgName=${encodeURIComponent(userName)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      await fetchUsers();
      setIsEditUserOpen(false);
      setSelectedUser(null);
      setFormData({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      !token ||
      !userName ||
      !window.confirm("Are you sure you want to delete this user?")
    )
      return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${userId}?orgName=${encodeURIComponent(
          userName
        )}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    });
    setIsEditUserOpen(true);
  };

  const handleCloseDialogs = () => {
    setIsAddUserOpen(false);
    setIsEditUserOpen(false);
    setSelectedUser(null);
    setFormData({ name: "", email: "", password: "", role: "user" });
  };

  const [supportForm, setSupportForm] = useState({ subject: "", message: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSupportSubmit = (e) => {
    e.preventDefault();

    setShowSuccess(true);

    setSupportForm({ subject: "", message: "" });

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-m font-bold text-white">User Management</h2>
              <Button
                onClick={() => setIsAddUserOpen(true)}
                className="bg-indigo-500 hover:bg-blue-600 transition-colors"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>

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
                  {users.map((user) => (
                    <TableRow key={user._id} className="hover:bg-black-800/50">
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "Active"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(user)}
                          className="mr-2 hover:bg-gray-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Add User Dialog */}
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={handleCloseDialogs}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogHeader>
                <form onSubmit={handleAddUser}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleCloseDialogs}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Add User
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={handleCloseDialogs}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogHeader>
                <form onSubmit={handleUpdateUser}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-name">Name</Label>
                      <Input
                        id="edit-name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-email">Email</Label>
                      <Input
                        id="edit-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-role">Role</Label>
                      <Select
                        id="edit-role"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        className="mt-1"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleCloseDialogs}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Update User
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        );

      case "plan":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-m font-bold text-white">Plan & Billing</h2>
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
                      <span className="text-white font-medium">
                        {orgDetails?.["Plan Name"] || "Loading..."}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price</span>
                      <span className="text-white font-medium">
                        ₹
                        {orgDetails
                          ? orgDetails.Amount.toLocaleString()
                          : "Loading..."}{" "}
                        per user
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Renewal Date</span>
                      <span className="text-white font-medium">
                        {orgDetails?.["Renewal Date"] || "Loading..."}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                        Active
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Users</span>
                      <span className="text-white font-medium">
                        {orgDetails
                          ? `${orgDetails.user_num}/${orgDetails.max_user}`
                          : "Loading..."}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Amount</span>
                      <span className="text-white font-medium">
                        ₹
                        {orgDetails
                          ? (
                              orgDetails.Amount *
                              parseInt(orgDetails.max_user.replace("+", ""))
                            ).toLocaleString()
                          : "Loading..."}
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
                    {paymentHistory.length > 0 ? (
                      paymentHistory.map((payment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-black-800"
                        >
                          <div>
                            <div className="font-medium text-white">
                              ₹{payment.amount.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-400">
                              {new Date(payment.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {payment.planName}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                payment.status === "Success"
                                  ? "bg-green-500/20 text-green-500"
                                  : "bg-red-500/20 text-red-500"
                              }`}
                            >
                              {payment.status}
                            </span>
                            <button className="flex items-center gap-2 text-blue-500 hover:text-blue-400">
                              <Download size={16} />
                              Invoice
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-400">
                        No payment history available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "support":
        return (
          <div className="space-y-4">
            <h2 className="text-m font-bold text-white">Support</h2>
            <Card>
              <CardHeader>
                <CardTitle>Contact Super Admin</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSupportSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Request to increase user limit"
                      value={supportForm.subject}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          subject: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Message
                    </label>
                    <textarea
                      className="w-full bg-black-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Describe your request..."
                      value={supportForm.message}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          message: e.target.value,
                        })
                      }
                      required
                    ></textarea>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button
                      type="submit"
                      className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Send Request
                    </button>
                    {showSuccess && (
                      <div className="text-green-500 text-center animate-fade-in">
                        Message sent successfully
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        );

      case "Dashboard":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                Welcome Back, {userName}
              </h2>
              <p className="text-gray-400 mt-1">
                Here's what's happening with your organization today.
              </p>
            </div>
            {/* Top Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Plan
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    {orgDetails ? orgDetails["Plan Name"] : "Loading..."}
                  </div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <Clock className="h-4 w-4" />
                    <p>
                      Renews on{" "}
                      {orgDetails ? orgDetails["Renewal Date"] : "Loading..."}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm font-medium text-gray-400">
                      Plan Features
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="h-3 w-3 text-blue-400" />
                        <span className="text-xs">
                          Up to {orgDetails ? orgDetails.max_user : "..."} Users
                        </span>
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
                  <CardTitle className="text-sm font-medium">
                    User Count
                  </CardTitle>
                  <Users className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    {orgDetails
                      ? `${orgDetails.user_num}/${orgDetails.max_user}`
                      : "Loading..."}
                  </div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <UserCheck className="h-4 w-4" />
                    <p>Active users</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm font-medium text-gray-400">
                      Usage
                    </div>
                    <div className="mt-2 space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-xs text-gray-400">
                            User Capacity
                          </span>
                          <span className="text-xs text-gray-300">
                            {orgDetails
                              ? Math.round(
                                  (orgDetails.user_num /
                                    parseInt(orgDetails.max_user)) *
                                    100
                                )
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-black-800 rounded-full h-1">
                          <div
                            className="bg-blue-500 h-1 rounded-full transition-all"
                            style={{
                              width: orgDetails
                                ? `${Math.round(
                                    (orgDetails.user_num /
                                      parseInt(orgDetails.max_user)) *
                                      100
                                  )}%`
                                : "0%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Next Payment
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    ₹
                    {orgDetails
                      ? (
                          orgDetails.Amount *
                          parseInt(orgDetails.max_user.replace("+", ""))
                        ).toLocaleString()
                      : "Loading..."}
                  </div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <Calendar className="h-4 w-4" />
                    <p>
                      Due on{" "}
                      {orgDetails ? orgDetails["Renewal Date"] : "Loading..."}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm font-medium text-gray-400">
                      Payment Details
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-gray-300">
                          <CreditCard className="h-3 w-3 text-gray-400" />
                          <span>Per User Cost</span>
                        </div>
                        <span className="text-gray-300">
                          ₹
                          {orgDetails
                            ? orgDetails.Amount.toLocaleString()
                            : "Loading..."}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveTab("users")} // Switch to User Management tab
                className="flex items-center justify-center gap-3 p-4 bg-black-800 border border-white/10 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <UserPlus className="h-5 w-5 text-blue-400" />
                <span className="text-sm">Add User</span>
              </button>
              <button className="flex items-center justify-center gap-3 p-4 bg-black-800  border border-white/10 rounded-lg hover:bg-gray-700 transition-colors">
                <ArrowUpCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">Upgrade Plan</span>
              </button>
              <button
                onClick={() => setActiveTab("plan")} // Switch to Plan & Billing tab
                className="flex items-center justify-center gap-3 p-4 bg-black-800 border border-white/10 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FileText className="h-5 w-5 text-purple-400" />
                <span className="text-sm">View Invoices</span>
              </button>
              <button
                onClick={() => setActiveTab("support")} // Switch to Support tab
                className="flex items-center justify-center gap-3 p-4 bg-black-800 border border-white/10 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <HelpCircle className="h-5 w-5 text-orange-400" />
                <span className="text-sm">Get Support</span>
              </button>
            </div>

            {/* Rest of the components remain the same */}
            {/* Activity and User Stats */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Previous Activity Card content */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Recent Activity
                  </CardTitle>
                  <Activity className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        icon: UserPlus,
                        text: "New user added",
                        time: "2 hours ago",
                        color: "text-blue-400",
                      },
                      {
                        icon: Receipt,
                        text: "Invoice generated",
                        time: "4 hours ago",
                        color: "text-green-400",
                      },
                      {
                        icon: Settings,
                        text: "Settings updated",
                        time: "6 hours ago",
                        color: "text-orange-400",
                      },
                      {
                        icon: Mail,
                        text: "Welcome email sent",
                        time: "8 hours ago",
                        color: "text-purple-400",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-full bg-black-800 ${activity.color}`}
                        >
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-300">
                            {activity.text}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Previous User Statistics Card content */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    User Statistics
                  </CardTitle>
                  <BarChart2 className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Previous statistics content */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Active Sessions</span>
                        <span className="text-gray-300">12</span>
                      </div>
                      <div className="w-full bg-black-800 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">API Usage</span>
                        <span className="text-gray-300">45%</span>
                      </div>
                      <div className="w-full bg-black-800 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Storage Used</span>
                        <span className="text-gray-300">75%</span>
                      </div>
                      <div className="w-full bg-black-800 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {/* Previous Bottom Cards content */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    User Growth
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">+12%</div>
                  <p className="text-gray-400 text-sm">
                    Growth from last month
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center p-2 bg-black-800 rounded-lg">
                      <span className="text-sm text-gray-400">New Users</span>
                      <span className="text-mg font-bold text-white">+5</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-black-800 rounded-lg">
                      <span className="text-sm text-gray-400">Total Users</span>
                      <span className="text-mg font-bold text-white">
                        {orgDetails ? orgDetails.user_num : "..."}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Support Status
                  </CardTitle>
                  <LifeBuoy className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-gray-300">
                      All systems operational
                    </span>
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
                  <CardTitle className="text-sm font-medium">
                    Security Status
                  </CardTitle>
                  <Shield className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-gray-300">
                      All protections active
                    </span>
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

      default:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                Welcome Back, {userName}
              </h2>
              <p className="text-gray-400 mt-1">
                Here's what's happening with your organization today.
              </p>
            </div>
            {/* Top Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Plan
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    {orgDetails ? orgDetails["Plan Name"] : "Loading..."}
                  </div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <Clock className="h-4 w-4" />
                    <p>
                      Renews on{" "}
                      {orgDetails ? orgDetails["Renewal Date"] : "Loading..."}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm font-medium text-gray-400">
                      Plan Features
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="h-3 w-3 text-blue-400" />
                        <span className="text-xs">
                          Up to {orgDetails ? orgDetails.max_user : "..."} Users
                        </span>
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
                  <CardTitle className="text-sm font-medium">
                    User Count
                  </CardTitle>
                  <Users className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    {orgDetails
                      ? `${orgDetails.user_num}/${orgDetails.max_user}`
                      : "Loading..."}
                  </div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <UserCheck className="h-4 w-4" />
                    <p>Active users</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm font-medium text-gray-400">
                      Usage
                    </div>
                    <div className="mt-2 space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-xs text-gray-400">
                            User Capacity
                          </span>
                          <span className="text-xs text-gray-300">
                            {orgDetails
                              ? Math.round(
                                  (orgDetails.user_num /
                                    parseInt(orgDetails.max_user)) *
                                    100
                                )
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-black-800 rounded-full h-1">
                          <div
                            className="bg-blue-500 h-1 rounded-full transition-all"
                            style={{
                              width: orgDetails
                                ? `${Math.round(
                                    (orgDetails.user_num /
                                      parseInt(orgDetails.max_user)) *
                                      100
                                  )}%`
                                : "0%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Next Payment
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">
                    ₹
                    {orgDetails
                      ? (
                          orgDetails.Amount *
                          parseInt(orgDetails.max_user.replace("+", ""))
                        ).toLocaleString()
                      : "Loading..."}
                  </div>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <Calendar className="h-4 w-4" />
                    <p>
                      Due on{" "}
                      {orgDetails ? orgDetails["Renewal Date"] : "Loading..."}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm font-medium text-gray-400">
                      Payment Details
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-gray-300">
                          <CreditCard className="h-3 w-3 text-gray-400" />
                          <span>Per User Cost</span>
                        </div>
                        <span className="text-gray-300">
                          ₹
                          {orgDetails
                            ? orgDetails.Amount.toLocaleString()
                            : "Loading..."}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveTab("users")} // Switch to User Management tab
                className="flex items-center justify-center gap-3 p-4 bg-black-800 border border-white/10 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <UserPlus className="h-5 w-5 text-blue-400" />
                <span className="text-sm">Add User</span>
              </button>
              <button className="flex items-center justify-center gap-3 p-4 bg-black-800  border border-white/10 rounded-lg hover:bg-gray-700 transition-colors">
                <ArrowUpCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">Upgrade Plan</span>
              </button>
              <button
                onClick={() => setActiveTab("plan")} // Switch to Plan & Billing tab
                className="flex items-center justify-center gap-3 p-4 bg-black-800 border border-white/10 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FileText className="h-5 w-5 text-purple-400" />
                <span className="text-sm">View Invoices</span>
              </button>
              <button
                onClick={() => setActiveTab("support")} // Switch to Support tab
                className="flex items-center justify-center gap-3 p-4 bg-black-800 border border-white/10 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <HelpCircle className="h-5 w-5 text-orange-400" />
                <span className="text-sm">Get Support</span>
              </button>
            </div>

            {/* Rest of the components remain the same */}
            {/* Activity and User Stats */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Previous Activity Card content */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Recent Activity
                  </CardTitle>
                  <Activity className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        icon: UserPlus,
                        text: "New user added",
                        time: "2 hours ago",
                        color: "text-blue-400",
                      },
                      {
                        icon: Receipt,
                        text: "Invoice generated",
                        time: "4 hours ago",
                        color: "text-green-400",
                      },
                      {
                        icon: Settings,
                        text: "Settings updated",
                        time: "6 hours ago",
                        color: "text-orange-400",
                      },
                      {
                        icon: Mail,
                        text: "Welcome email sent",
                        time: "8 hours ago",
                        color: "text-purple-400",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-full bg-black-800 ${activity.color}`}
                        >
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-300">
                            {activity.text}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Previous User Statistics Card content */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    User Statistics
                  </CardTitle>
                  <BarChart2 className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Previous statistics content */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Active Sessions</span>
                        <span className="text-gray-300">12</span>
                      </div>
                      <div className="w-full bg-black-800 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">API Usage</span>
                        <span className="text-gray-300">45%</span>
                      </div>
                      <div className="w-full bg-black-800 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Storage Used</span>
                        <span className="text-gray-300">75%</span>
                      </div>
                      <div className="w-full bg-black-800 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {/* Previous Bottom Cards content */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    User Growth
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">+12%</div>
                  <p className="text-gray-400 text-sm">
                    Growth from last month
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center p-2 bg-black-800 rounded-lg">
                      <span className="text-sm text-gray-400">New Users</span>
                      <span className="text-mg font-bold text-white">+5</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-black-800 rounded-lg">
                      <span className="text-sm text-gray-400">Total Users</span>
                      <span className="text-mg font-bold text-white">
                        {orgDetails ? orgDetails.user_num : "..."}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Support Status
                  </CardTitle>
                  <LifeBuoy className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-gray-300">
                      All systems operational
                    </span>
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
                  <CardTitle className="text-sm font-medium">
                    Security Status
                  </CardTitle>
                  <Shield className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-gray-300">
                      All protections active
                    </span>
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

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
      </div>
    );
  }
  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-black text-gray-300">
        {/* Sidebar */}
        <div className="w-72 border-r border-white/10 flex flex-col">
          {/* Organization Name */}
          <div className="h-[4.5rem] flex items-center justify-center p-4 border-b border-white/10">
            <button className="flex items-center justify-center w-full gap-2 text-white">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm">Organization Admin</span>
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
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-black-800 transition-colors ${
                        activeTab === item.tab
                          ? "bg-black-800 text-white"
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
          <div className="p-4 border-t border-white/10">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs text-gray-400 hover:text-gray-300">
              <HelpCircle size={18} />
              Help & Documentation
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-[4.5rem] border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-black-800 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 ml-4">
              <button className="p-2 hover:bg-black-800 rounded-lg transition-colors">
                <Moon size={18} />
              </button>
              <button
                onClick={handleLogout}
                className="flex justify-center items-center w-[8rem] h-8 bg-white text-black rounded-full"
              >
                Logout
              </button>
              <div className="w-8 h-8 overflow-hidden border border-white/10 rounded-full bg-gray-700">
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
    </ErrorBoundary>
  );
};

export default AdminDashboard;

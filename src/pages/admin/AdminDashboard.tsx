import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

interface DashboardStats {
  totalCustomers: number;
  totalQuotations: number;
  totalProjects: number;
  totalRevenue: number;
}

interface PendingUser {
  id: number;
  email: string;
  status: "pending_approval" | "approved" | "active" | "rejected";
  created_at: string;
}

type Tab = "overview" | "approvals";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalQuotations: 0,
    totalProjects: 0,
    totalRevenue: 0,
  });
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const token = localStorage.getItem("token");

  const showNotification = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchStats();
  }, []);

  useEffect(() => {
    if (tab === "approvals") fetchPendingUsers();
  }, [tab]);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPendingUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await API.get("/auth/admin/pending-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleApprove = async (userId: number) => {
    setActionLoading(userId);
    try {
      const res = await API.post(
        "/auth/admin/approve",
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const link = res.data.setupLink;

      // Copy link to clipboard
      await navigator.clipboard.writeText(link);
      setCopiedLink(link);
      showNotification("success", "User approved! Setup link copied to clipboard.");
      fetchPendingUsers();
    } catch (err: any) {
      showNotification("error", err.response?.data?.message || "Failed to approve.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (userId: number) => {
    if (!window.confirm("Are you sure you want to reject this access request?")) return;
    setActionLoading(userId);
    try {
      await API.post(
        "/auth/admin/reject",
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showNotification("success", "Request rejected.");
      fetchPendingUsers();
    } catch (err: any) {
      showNotification("error", err.response?.data?.message || "Failed to reject.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const pendingCount = pendingUsers.filter(u => u.status === "pending_approval").length;

  const statusBadge = (status: PendingUser["status"]) => {
    const map = {
      pending_approval: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      approved: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      active: "bg-green-500/20 text-green-400 border-green-500/30",
      rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    const labels = {
      pending_approval: "Pending",
      approved: "Approved (awaiting setup)",
      active: "Active",
      rejected: "Rejected",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${map[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Notification toast */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl border text-sm font-medium max-w-sm transition-all ${
          notification.type === "success"
            ? "bg-green-950 border-green-500/40 text-green-300"
            : "bg-red-950 border-red-500/40 text-red-300"
        }`}>
          {notification.msg}
        </div>
      )}

      {/* Top bar */}
      <div className="bg-black/60 border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-white">Surya Electricals</p>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab("overview")}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition ${
              tab === "overview"
                ? "bg-yellow-500 text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setTab("approvals")}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition flex items-center gap-2 ${
              tab === "approvals"
                ? "bg-yellow-500 text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Access Requests
            {pendingCount > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                tab === "approvals" ? "bg-black/30 text-black" : "bg-yellow-500 text-black"
              }`}>
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* Overview Tab */}
        {tab === "overview" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Overview of your business metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: "Customers", value: stats.totalCustomers, icon: "👥", color: "from-blue-500/20 to-blue-600/5" },
                { label: "Quotations", value: stats.totalQuotations, icon: "📋", color: "from-purple-500/20 to-purple-600/5" },
                { label: "Projects", value: stats.totalProjects, icon: "🔧", color: "from-orange-500/20 to-orange-600/5" },
                { label: "Revenue", value: `₹${Number(stats.totalRevenue).toLocaleString("en-IN")}`, icon: "💰", color: "from-green-500/20 to-green-600/5" },
              ].map((card) => (
                <div key={card.label} className={`bg-gradient-to-br ${card.color} border border-white/10 rounded-2xl p-6`}>
                  <div className="text-3xl mb-3">{card.icon}</div>
                  <p className="text-gray-400 text-sm">{card.label}</p>
                  <p className="text-3xl font-bold mt-1">{card.value}</p>
                </div>
              ))}
            </div>

            {/* Hint card */}
            {pendingCount > 0 && (
              <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <p className="text-yellow-300 font-semibold">{pendingCount} pending access request{pendingCount > 1 ? "s" : ""}</p>
                  <p className="text-yellow-400/70 text-sm">
                    <button onClick={() => setTab("approvals")} className="underline hover:text-yellow-300">
                      Go to Access Requests →
                    </button>
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Approvals Tab */}
        {tab === "approvals" && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Access Requests</h1>
                <p className="text-gray-400 mt-1">Review and approve client portal access</p>
              </div>
              <button
                onClick={fetchPendingUsers}
                className="text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg transition"
              >
                ↻ Refresh
              </button>
            </div>

            {copiedLink && (
              <div className="mb-6 bg-blue-950/50 border border-blue-500/30 rounded-2xl p-5">
                <p className="text-blue-300 text-sm font-semibold mb-2">📋 Setup link copied to clipboard — share this with the user:</p>
                <code className="text-blue-200/70 text-xs break-all">{copiedLink}</code>
              </div>
            )}

            {loadingUsers ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin"></div>
              </div>
            ) : pendingUsers.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <div className="text-5xl mb-4">📭</div>
                <p>No access requests yet</p>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Email</th>
                      <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Requested</th>
                      <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Status</th>
                      <th className="text-right px-6 py-4 text-gray-400 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pendingUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-white font-medium">{user.email}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {new Date(user.created_at).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                            hour: "2-digit", minute: "2-digit"
                          })}
                        </td>
                        <td className="px-6 py-4">{statusBadge(user.status)}</td>
                        <td className="px-6 py-4 text-right">
                          {user.status === "pending_approval" ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleApprove(user.id)}
                                disabled={actionLoading === user.id}
                                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black text-sm font-semibold rounded-lg transition flex items-center gap-1.5"
                              >
                                {actionLoading === user.id ? (
                                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                                ) : "✓ Approve"}
                              </button>
                              <button
                                onClick={() => handleReject(user.id)}
                                disabled={actionLoading === user.id}
                                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 text-red-400 border border-red-500/30 text-sm font-semibold rounded-lg transition"
                              >
                                ✕ Reject
                              </button>
                            </div>
                          ) : user.status === "approved" ? (
                            <button
                              onClick={() => handleApprove(user.id)}
                              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 text-sm rounded-lg transition"
                            >
                              Resend Link
                            </button>
                          ) : (
                            <span className="text-gray-600 text-sm">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

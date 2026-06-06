import { useEffect, useState } from "react";
import API from "../../services/api";

interface DashboardData {
  totalProjects: number;
  totalQuotations: number;
  approvedQuotations: number;
  totalPayments: number;
}

const CustomerDashboard = () => {
  const [data, setData] = useState<DashboardData>({
    totalProjects: 0,
    totalQuotations: 0,
    approvedQuotations: 0,
    totalPayments: 0,
  });

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get(
        `/customer/dashboard/${user.id}`
      );

      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, {user.name}
        </h1>

        <p className="text-gray-600 mt-2">
          Manage your electrical projects,
          quotations and payments.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500">
            Total Quotations
          </h3>

          <p className="text-3xl font-bold mt-2">
            {data.totalQuotations}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500">
            Approved Quotations
          </h3>

          <p className="text-3xl font-bold mt-2">
            {data.approvedQuotations}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500">
            Active Projects
          </h3>

          <p className="text-3xl font-bold mt-2">
            {data.totalProjects}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500">
            Total Payments
          </h3>

          <p className="text-3xl font-bold mt-2">
            ₹ {data.totalPayments}
          </p>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="mt-10">

        <h2 className="text-2xl font-semibold mb-5">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <button
            className="bg-blue-600 text-white p-4 rounded-xl shadow"
          >
            Request New Quotation
          </button>

          <button
            className="bg-green-600 text-white p-4 rounded-xl shadow"
          >
            Track Projects
          </button>

          <button
            className="bg-purple-600 text-white p-4 rounded-xl shadow"
          >
            Payment History
          </button>

        </div>

      </div>

    </div>
  );
};

export default CustomerDashboard;
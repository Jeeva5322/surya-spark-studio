import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: "admin" | "customer";
}

/**
 * FIX 9: Guards routes so unauthenticated users are redirected to /login.
 * Optionally restrict to a specific role (admin or customer).
 */
const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  // Not logged in at all
  if (!token || !userRaw) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (allowedRole) {
    try {
      const user = JSON.parse(userRaw);
      if (user.role !== allowedRole) {
        // Wrong role — send them to their own dashboard or login
        const redirect = user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard";
        return <Navigate to={redirect} replace />;
      }
    } catch {
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;

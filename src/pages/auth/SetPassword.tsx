import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

type Stage = "loading" | "invalid" | "form" | "success";

const SetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  const [stage, setStage] = useState<Stage>("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setStage("invalid");
      return;
    }

    API.get(`/auth/verify-setup-token/${token}`)
      .then((res) => {
        setEmail(res.data.email);
        setStage("form");
      })
      .catch(() => {
        setStage("invalid");
      });
  }, [token]);

  const passwordStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = passwordStrength(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500"][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await API.post("/auth/set-password", { token, password, confirmPassword });
      setStage("success");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-yellow-500/20">

        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-yellow-500 to-amber-600 text-black">
          <h1 className="text-5xl font-bold mb-6">Almost There!</h1>
          <p className="text-lg leading-relaxed">
            Your access has been approved. Set a strong password to secure your account.
          </p>
          <div className="mt-10 space-y-3 text-black/80 text-sm">
            <p className="font-semibold text-base">Password Tips:</p>
            <div>✓ At least 8 characters long</div>
            <div>✓ Include uppercase letters (A–Z)</div>
            <div>✓ Include numbers (0–9)</div>
            <div>✓ Include special characters (!@#$...)</div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          {stage === "loading" && (
            <div className="text-center">
              <div className="w-10 h-10 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Verifying your setup link...</p>
            </div>
          )}

          {stage === "invalid" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.07 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Invalid or Expired Link</h3>
              <p className="text-gray-400 text-sm mb-6">
                This password setup link is invalid or has expired. Please contact your admin for a new one.
              </p>
              <Link to="/login" className="text-yellow-500 hover:text-yellow-400 font-medium text-sm">
                ← Back to Login
              </Link>
            </div>
          )}

          {stage === "form" && (
            <>
              <h2 className="text-4xl font-bold text-white mb-1">Set Your Password</h2>
              {email && (
                <p className="text-yellow-400 text-sm mb-6">{email}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Password */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full p-4 pr-12 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      {showPass ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {password.length > 0 && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-gray-700"}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-400">Strength: <span className={strength >= 3 ? "text-green-400" : strength === 2 ? "text-yellow-400" : "text-red-400"}>{strengthLabel}</span></p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repeat your password"
                      className={`w-full p-4 pr-12 rounded-xl bg-white/10 border text-white placeholder-gray-500 focus:outline-none transition ${
                        confirmPassword && confirmPassword !== password
                          ? "border-red-500 focus:border-red-500"
                          : confirmPassword && confirmPassword === password
                          ? "border-green-500 focus:border-green-500"
                          : "border-gray-700 focus:border-yellow-500"
                      }`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      {showConfirm ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                  {confirmPassword && confirmPassword === password && (
                    <p className="text-xs text-green-400 mt-1">✓ Passwords match</p>
                  )}
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-xl transition duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                      Setting Password...
                    </>
                  ) : "Set Password & Activate Account"}
                </button>
              </form>
            </>
          )}

          {stage === "success" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Account Activated!</h3>
              <p className="text-gray-400 mb-8">
                Your password has been set successfully. You can now login to access your dashboard.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-4 rounded-xl transition duration-300"
              >
                Go to Login
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SetPassword;

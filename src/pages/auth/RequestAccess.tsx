import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

type Stage = "form" | "submitted";

const RequestAccess = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stage, setStage] = useState<Stage>("form");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/request-access", { email });
      setStage("submitted");
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
          <h1 className="text-5xl font-bold mb-6">Surya Electricals</h1>
          <p className="text-lg leading-relaxed">
            Our client portal is exclusively for verified customers and business partners.
            Submit your email and our admin team will verify and grant you access.
          </p>
          <div className="mt-10 space-y-4 text-black/80">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center text-sm font-bold">1</span>
              <span>Submit your email address</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center text-sm font-bold">2</span>
              <span>Admin reviews & approves your request</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center text-sm font-bold">3</span>
              <span>You receive a secure link to set your password</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center text-sm font-bold">4</span>
              <span>Login anytime to access your dashboard</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          {stage === "form" ? (
            <>
              <h2 className="text-4xl font-bold text-white mb-2">Request Access</h2>
              <p className="text-gray-400 mb-8">
                Enter your email address to begin the verification process.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full p-4 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
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
                      Submitting...
                    </>
                  ) : "Submit Request"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-yellow-500 hover:text-yellow-400 font-medium">
                    Sign In
                  </Link>
                </p>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Request Submitted!</h3>
              <p className="text-gray-400 mb-2">
                Your request for <span className="text-yellow-400 font-medium">{email}</span> has been submitted.
              </p>
              <p className="text-gray-500 text-sm mb-8">
                Our admin team will review your request and send you a password setup link once approved. This usually takes 1–2 business days.
              </p>
              <Link
                to="/login"
                className="text-yellow-500 hover:text-yellow-400 font-medium text-sm"
              >
                ← Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestAccess;

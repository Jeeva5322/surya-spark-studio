import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await API.post(
        "/auth/register",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black flex items-center justify-center px-4">

      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-yellow-500/20">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-yellow-500 to-amber-600 text-black">

          <h1 className="text-5xl font-bold mb-6">
            Surya Electricals
          </h1>

          <p className="text-lg leading-relaxed">
            Join our customer portal to request
            quotations, track project progress,
            manage payments, and stay connected
            with our electrical solutions team.
          </p>

          <div className="mt-10 space-y-4">
            <div>✓ Request Quotations</div>
            <div>✓ Track Electrical Projects</div>
            <div>✓ View Payment History</div>
            <div>✓ Get Customer Support</div>
          </div>

        </div>

        {/* Right Side */}

        <div className="p-8 md:p-12">

          <h2 className="text-4xl font-bold text-white mb-2">
            Create Account
          </h2>

          <p className="text-gray-400 mb-8">
            Register to access your customer dashboard
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-4 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-4 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-4 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-4 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-4 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-4 rounded-xl transition duration-300"
            >
              Create Account
            </button>

          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-500 hover:text-yellow-400"
            >
              Sign In
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;
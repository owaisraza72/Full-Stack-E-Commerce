import { useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Verifying credentials...");

    try {
      const res = await login(form).unwrap();

      if (!res?.user) {
        throw new Error("Invalid server response");
      }

      // ✅ STEP 1: save user in redux FIRST
      dispatch(setUser(res.user));

      toast.success("Welcome back!", { id: loadToast });

      // ✅ STEP 2: ROLE BASED REDIRECT (ONLY ONCE)
      if (res.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (res.user.role === "seller") {
        navigate("/seller", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Login failed", {
        id: loadToast,
      });
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-500/10 border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500">Log in to your Nexus account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="input w-full"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="input w-full"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button
              disabled={isLoading}
              className="btn btn-primary w-full"
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            New here?{" "}
            <Link to="/signup" className="text-indigo-600 font-bold">
              Create account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

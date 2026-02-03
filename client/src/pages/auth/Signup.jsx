import { useState } from "react";
import { useSignupMutation } from "../../features/auth/authApi";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    about: "",
    role: "user", // Default role
  });

  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Creating your account...");
    try {
      await signup(form).unwrap();
      toast.success("Account created! You can now log in.", { id: loadToast });
      navigate("/login");
    } catch (err) {
      toast.error(
        err?.data?.message ||
          "Something went wrong. Please check your details.",
        { id: loadToast },
      );
    }
  };

  return (
    <div className="min-h-screen py-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-indigo-500/10 border border-gray-100">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-heading text-gray-900 mb-3">
              Join Nexus
            </h1>
            <p className="text-gray-500">
              Create your account to start shopping or selling.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["user", "seller"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, role: r })}
                    className={`py-3 rounded-xl border-2 transition-all duration-300 font-bold capitalize ${
                      form.role === r
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                        : "border-gray-100 text-gray-400 hover:border-gray-200"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Full Name
              </label>
              <input
                name="name"
                placeholder="John Doe"
                className="input w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                className="input w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="input w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Gender
              </label>
              <select
                name="gender"
                className="input w-full appearance-none"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Age
              </label>
              <input
                name="age"
                type="number"
                placeholder="25"
                className="input w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                About (Optional)
              </label>
              <textarea
                name="about"
                placeholder="Tell us a bit about yourself..."
                className="input w-full min-h-[100px] resize-none"
                onChange={handleChange}
              />
            </div>

            <button
              disabled={isLoading}
              className="btn btn-primary w-full md:col-span-2 shadow-xl shadow-indigo-500/30 mt-6"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-10 text-center pt-8 border-t border-gray-100">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-bold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

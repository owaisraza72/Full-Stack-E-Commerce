import { useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Shield, 
  Sparkles,
  Gem,
  Loader2
} from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ 
    email: "", 
    password: "" 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Signing you in...");

    try {
      const res = await login(form).unwrap();

      if (!res?.user) {
        throw new Error("Invalid server response");
      }

      dispatch(setUser(res.user));
      toast.success("Welcome back! 🎉", { 
        id: loadToast,
        icon: '👋',
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });

      // Role-based redirect
      setTimeout(() => {
        if (res.user.role === "admin") {
          navigate("/admin", { replace: true });
        } else if (res.user.role === "seller") {
          navigate("/seller", { replace: true });
        } else {
          navigate(from, { 
            replace: true,
            state: location.state
          });
        }
      }, 500);

    } catch (err) {
      toast.error(err?.data?.message || "Invalid credentials", {
        id: loadToast,
        icon: '❌',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/20 to-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-lg z-10"
      >
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center border-b border-gray-100">
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Gem className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-2xl blur" />
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-3xl font-light text-gray-900 mb-2"
            >
              Welcome Back
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-gray-500 font-light"
            >
              Sign in to access your premium account
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-light text-gray-700 mb-2 tracking-wider">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 outline-none transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-light text-gray-700 mb-2 tracking-wider">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-amber-600 hover:text-amber-700 font-light"
                  >
                    Forgot password?
                  </Link>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="w-full py-3.5 bg-gradient-to-r from-gray-900 to-black text-white font-light tracking-widest rounded-xl hover:shadow-xl transition-all relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <motion.div
                          animate={{ x: isHovering ? 5 : 0 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ArrowRight size={18} />
                        </motion.div>
                      </>
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-rose-500"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovering ? "0%" : "-100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>

              {/* Divider */}
              <motion.div variants={itemVariants} className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-light">
                    Or continue with
                  </span>
                </div>
              </motion.div>

              {/* Social Login */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-light"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-light"
                >
                  GitHub
                </button>
              </motion.div>
            </div>
          </form>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <div className="text-center">
              <p className="text-gray-600 font-light">
                New to ÉLÉGANCE?{" "}
                <Link
                  to="/signup"
                  className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500"
        >
          <Shield className="w-4 h-4" />
          <span className="font-light">Your data is securely encrypted</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
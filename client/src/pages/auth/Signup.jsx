import { useState } from "react";
import { useSignupMutation } from "../../features/auth/authApi";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Calendar,
  UserCircle,
  ShoppingBag,
  Sparkles,
  Gem,
  Loader2,
  ArrowRight,
  Shield
} from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    about: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (form.age && (form.age < 13 || form.age > 120)) {
      toast.error("Please enter a valid age");
      return;
    }

    const loadToast = toast.loading("Creating your premium account...");

    try {
      await signup(form).unwrap();
      toast.success("Welcome to ÉLÉGANCE! 🎉", { 
        id: loadToast,
        icon: '✨',
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      
    } catch (err) {
      toast.error(
        err?.data?.message || "Unable to create account. Please try again.",
        { id: loadToast }
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-4xl z-10"
      >
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center border-b border-gray-100">
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Gem className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-2xl blur" />
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-3xl font-light text-gray-900 mb-2"
            >
              Join ÉLÉGANCE
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-gray-500 font-light"
            >
              Create your premium account in seconds
            </motion.p>
          </div>

          {/* Account Type Selection */}
          <motion.div variants={itemVariants} className="px-8 pt-8">
            <label className="block text-sm font-light text-gray-700 mb-4 tracking-wider">
              ACCOUNT TYPE
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "user", icon: <UserCircle size={20} />, label: "Customer", description: "Shop premium collections" },
                { value: "seller", icon: <ShoppingBag size={20} />, label: "Seller", description: "Sell your products" }
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: type.value })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
                    form.role === type.value
                      ? "border-amber-500 bg-gradient-to-r from-amber-50 to-rose-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      form.role === type.value ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      {type.icon}
                    </div>
                    <span className={`font-medium ${
                      form.role === type.value ? "text-gray-900" : "text-gray-700"
                    }`}>
                      {type.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-light text-gray-700 mb-2 tracking-wider">
                  FULL NAME
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 outline-none transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-light text-gray-700 mb-2 tracking-wider">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 outline-none transition-all"
                    placeholder="john@example.com"
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
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
              </motion.div>

              {/* Confirm Password */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-light text-gray-700 mb-2 tracking-wider">
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </motion.div>

              {/* Gender */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-light text-gray-700 mb-2 tracking-wider">
                  GENDER
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full pl-4 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 outline-none transition-all appearance-none"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Age */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-light text-gray-700 mb-2 tracking-wider">
                  AGE
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="age"
                    type="number"
                    min="13"
                    max="120"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 outline-none transition-all"
                    placeholder="25"
                    required
                  />
                </div>
              </motion.div>

              {/* About (Full Width) */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label className="block text-sm font-light text-gray-700 mb-2 tracking-wider">
                  ABOUT YOU (OPTIONAL)
                </label>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 outline-none transition-all min-h-[100px] resize-none"
                  placeholder="Tell us about yourself or your brand..."
                  rows={3}
                />
              </motion.div>

              {/* Terms & Privacy */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 font-light">
                    I agree to the{" "}
                    <Link to="/terms" className="text-amber-600 hover:text-amber-700">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-amber-600 hover:text-amber-700">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="md:col-span-2">
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
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Premium Account
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
            </div>
          </form>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <div className="text-center">
              <p className="text-gray-600 font-light">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  Sign In
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
          <span className="font-light">Your data is protected with bank-level security</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
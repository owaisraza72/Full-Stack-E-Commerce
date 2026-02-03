import { Link } from "react-router-dom";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail, 
  Heart,
  Shield,
  CreditCard,
  Truck
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const quickLinks = [
    { name: "Shop All", path: "/products" },
    { name: "New Arrivals", path: "/new" },
    { name: "Best Sellers", path: "/best" },
    { name: "Sale", path: "/sale" },
  ];

  const helpLinks = [
    { name: "Contact Us", path: "/contact" },
    { name: "Shipping", path: "/shipping" },
    { name: "Returns", path: "/returns" },
    { name: "FAQ", path: "/faq" },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "Press", path: "/press" },
  ];

  const socialLinks = [
    { icon: <Instagram size={18} />, color: "hover:bg-pink-500" },
    { icon: <Twitter size={18} />, color: "hover:bg-blue-400" },
    { icon: <Facebook size={18} />, color: "hover:bg-blue-600" },
  ];

  const features = [
    { icon: <Truck size={16} />, text: "Free Shipping" },
    { icon: <Shield size={16} />, text: "Secure Checkout" },
    { icon: <CreditCard size={16} />, text: "Easy Returns" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Features Banner */}
      <div className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-amber-600">
                  {feature.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">ÉLÉGANCE</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Premium quality products curated for the modern lifestyle.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 transition-colors ${social.color} hover:text-white`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-500 hover:text-amber-600 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              Help
            </h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-500 hover:text-amber-600 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              Stay Updated
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Get exclusive offers and style tips.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} ÉLÉGANCE. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <Link to="/privacy" className="hover:text-gray-700 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-gray-700 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-gray-700 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;
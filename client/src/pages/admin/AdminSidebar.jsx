// AdminSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  DollarSign,
  TrendingUp,
  Bell,
  HelpCircle,
  FileText,
  CreditCard,
  Tag
} from "lucide-react";
import { motion } from "framer-motion";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin" },
    { icon: <Users size={20} />, label: "Users", path: "/admin/users" },
    { icon: <ShoppingBag size={20} />, label: "Orders", path: "/admin/orders" },
    { icon: <Package size={20} />, label: "Products", path: "/admin/products" },
    { icon: <BarChart3 size={20} />, label: "Analytics", path: "/admin/analytics" },
    { icon: <CreditCard size={20} />, label: "Payments", path: "/admin/payments" },
    { icon: <Tag size={20} />, label: "Discounts", path: "/admin/discounts" },
    { icon: <Settings size={20} />, label: "Settings", path: "/admin/settings" },
  ];

  const bottomItems = [
    { icon: <HelpCircle size={20} />, label: "Help & Support", path: "/admin/help" },
    { icon: <FileText size={20} />, label: "Documentation", path: "/admin/docs" },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 bg-white border-r border-gray-200 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-rose-500 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            <p className="text-xs text-gray-500">E-commerce Management</p>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
                            (item.path === "/admin" && location.pathname === "/admin/");
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-amber-50 to-rose-50 text-amber-700 border-l-4 border-amber-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className={`${isActive ? "text-amber-600" : "text-gray-400"}`}>
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-6"></div>

        {/* Quick Stats */}
        <div className="px-4 mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Stats
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Today's Revenue</span>
              <span className="font-semibold text-green-600">$4,238</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Pending Orders</span>
              <span className="font-semibold text-amber-600">24</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">New Users</span>
              <span className="font-semibold text-blue-600">42</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        {bottomItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            {item.icon}
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        ))}
        
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-4">
          <LogOut size={20} />
          <span className="font-medium text-sm">Log Out</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
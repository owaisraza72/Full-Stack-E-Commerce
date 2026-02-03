import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Eye,
  Star,
  Package,
  Shield,
  Bell,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  MoreVertical,
  BarChart3,
  PieChart,
  Activity,
  CreditCard,
  TrendingDown,
  Image as ImageIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../../features/products/productApi";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: productsData, isLoading: productsLoading } =
    useGetAllProductsQuery();

  const [stats, setStats] = useState({
    totalUsers: 1254,
    totalOrders: 892,
    totalRevenue: 125430,
    conversionRate: 4.2,
    activeUsers: 432,
    pendingOrders: 56,
    refunds: 12,
    growth: 12.5,
  });
  const [isLoading, setIsLoading] = useState(false);

  const isBaseRoute =
    location.pathname === "/admin" || location.pathname === "/admin/";

  // Get real products from backend
  const products = productsData?.products || [];

  // Get top selling products (mock logic - you should have sales data in your backend)
  const topProducts = products
    .slice(0, 5)
    .map((product) => ({
      ...product,
      sales: Math.floor(Math.random() * 500) + 100, // Mock sales data
      revenue: `$${(product.price * (Math.floor(Math.random() * 500) + 100)).toLocaleString()}`,
      growth: `+${Math.floor(Math.random() * 30) + 5}%`,
    }))
    .sort((a, b) => b.sales - a.sales);

  // Calculate real stats from products
  useEffect(() => {
    if (products.length > 0) {
      const totalRevenue = products.reduce((sum, product) => {
        return sum + product.price * (product.stock || 0);
      }, 0);

      setStats((prev) => ({
        ...prev,
        totalRevenue,
        totalOrders: products.length * 15, // Mock order count
      }));
    }
  }, [products]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Stats cards with real data
  const statCards = [
    {
      title: "Total Products",
      value: products.length.toLocaleString(),
      change: `${Math.floor(Math.random() * 10) + 5}%`,
      trend: "up",
      icon: <Package className="w-6 h-6" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      route: "/admin/products",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      change: "+8%",
      trend: "up",
      icon: <ShoppingBag className="w-6 h-6" />,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      route: "/admin/orders",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: "+15%",
      trend: "up",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      route: "/admin/analytics",
    },
    {
      title: "Avg. Price",
      value: `$${products.length > 0 ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : "0"}`,
      change: "-2%",
      trend: "down",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      route: "/admin/analytics",
    },
  ];

  // Recent activities with product events
  const recentActivities = [
    {
      user: "Alex Johnson",
      action: "purchased",
      product: products[0]?.name || "Premium Headphones",
      time: "2 min ago",
      amount: products[0]?.price ? `$${products[0].price}` : "$245.99",
      status: "success",
    },
    {
      user: "Sarah Miller",
      action: "reviewed",
      product: products[1]?.name || "Wireless Earbuds",
      time: "15 min ago",
      amount: "",
      status: "info",
    },
    {
      user: "Mike Chen",
      action: "added to cart",
      product: products[2]?.name || "Smart Watch",
      time: "1 hour ago",
      amount: "",
      status: "info",
    },
    {
      user: "Emma Wilson",
      action: "wishlisted",
      product: products[3]?.name || "Laptop Stand",
      time: "2 hours ago",
      amount: "",
      status: "info",
    },
    {
      user: "David Kim",
      action: "returned",
      product: products[4]?.name || "USB-C Hub",
      time: "3 hours ago",
      amount: products[4]?.price ? `$${products[4].price}` : "$89.99",
      status: "warning",
    },
  ];

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <AnimatePresence mode="wait">
          {isBaseRoute ? (
            <motion.div
              key="base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900">
                    Dashboard Overview
                  </h1>
                  <p className="text-gray-500 mt-2">
                    Welcome back! Here's what's happening with your store today.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRefresh}
                    className={`flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
                      isLoading ? "opacity-50" : ""
                    }`}
                    disabled={isLoading}
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                    />
                    {isLoading ? "Refreshing..." : "Refresh"}
                  </button>
                  <button className="p-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate(stat.route)}
                    className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <div className={stat.iconColor}>{stat.icon}</div>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <ArrowUpRight size={16} />
                        ) : (
                          <ArrowDownRight size={16} />
                        )}
                        {stat.change}
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-500 text-sm">{stat.title}</p>

                    <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-gray-900 to-black transition-all duration-300 mt-4"></div>
                  </motion.div>
                ))}
              </div>

              {/* Products Preview & Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Products */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Recent Products
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Latest added items
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/admin/products")}
                      className="text-sm font-medium text-amber-600 hover:text-amber-700"
                    >
                      View All →
                    </button>
                  </div>

                  {productsLoading ? (
                    <div className="flex justify-center py-12">
                      <div className="w-8 h-8 border-3 border-gray-200 border-t-amber-500 rounded-full animate-spin"></div>
                    </div>
                  ) : products.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No products found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {products.slice(0, 4).map((product, index) => (
                        <motion.div
                          key={product._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <ImageIcon className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-500 truncate">
                              {product.category}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-semibold text-gray-900">
                                ${product.price}
                              </span>
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                                {product.stock || 0} in stock
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => navigate(`/admin/products`)}
                            className="px-3 py-1.5 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          >
                            View
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Active Users */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Active Users
                      </h3>
                      <p className="text-gray-500 text-sm">Currently online</p>
                    </div>
                    <Activity className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="text-center py-8">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {stats.activeUsers}
                    </div>
                    <p className="text-gray-500">Users active right now</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Mobile Users
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        68%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "68%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Desktop Users
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        32%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: "32%" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recent Activities & Top Products */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Recent Activities
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Latest user actions
                      </p>
                    </div>
                    <Bell className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              activity.status === "success"
                                ? "bg-green-100"
                                : activity.status === "warning"
                                  ? "bg-amber-100"
                                  : activity.status === "error"
                                    ? "bg-red-100"
                                    : "bg-blue-100"
                            }`}
                          >
                            <span
                              className={`text-sm font-medium ${
                                activity.status === "success"
                                  ? "text-green-600"
                                  : activity.status === "warning"
                                    ? "text-amber-600"
                                    : activity.status === "error"
                                      ? "text-red-600"
                                      : "text-blue-600"
                              }`}
                            >
                              {activity.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              <span className="font-semibold">
                                {activity.user}
                              </span>{" "}
                              {activity.action}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {activity.product}
                            </p>
                            <p className="text-xs text-gray-400">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                        {activity.amount && (
                          <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                            {activity.amount}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Top Selling Products */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Top Selling Products
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Best sellers this month
                      </p>
                    </div>
                    <Star className="w-5 h-5 text-gray-400" />
                  </div>

                  {productsLoading ? (
                    <div className="flex justify-center py-12">
                      <div className="w-8 h-8 border-3 border-gray-200 border-t-amber-500 rounded-full animate-spin"></div>
                    </div>
                  ) : topProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No products found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <motion.div
                          key={product._id || index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-sm font-semibold text-gray-600">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {product.name}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                  {product.sales} sales
                                </span>
                                <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                                  {product.category}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">
                              {product.revenue}
                            </p>
                            <p
                              className={`text-xs font-medium ${
                                product.growth.startsWith("+")
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {product.growth}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Need Help?
                    </h3>
                    <p className="text-gray-300">
                      Get instant support or explore our documentation
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate("/admin/docs")}
                      className="px-4 py-2.5 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      View Documentation
                    </button>
                    <button
                      onClick={() => navigate("/admin/help")}
                      className="px-4 py-2.5 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
                    >
                      Contact Support
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;

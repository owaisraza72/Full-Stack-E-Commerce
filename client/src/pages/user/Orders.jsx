import { useGetMyOrdersQuery } from "../../features/orders/orderApi";
import { motion } from "framer-motion";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  const { data, isLoading, isError } = useGetMyOrdersQuery();
  const orders = data?.orders || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-100";
      case "delivered":
        return "text-green-600 bg-green-50 border-green-100";
      case "shipped":
        return "text-blue-600 bg-blue-50 border-blue-100";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-100";
      default:
        return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle2 className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  if (isLoading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="bg-[#fcfcfd] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 font-heading">
            Order History
          </h1>
          <p className="text-gray-500 mt-2">
            Track and manage your Nexus marketplace purchases.
          </p>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <Package className="w-10 h-10 text-gray-200" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Orders Yet
            </h2>
            <p className="text-gray-500 mb-10 max-w-sm mx-auto">
              Looks like you haven't placed any orders. Start shopping our
              premium collection today!
            </p>
            <Link
              to="/"
              className="btn btn-primary shadow-xl shadow-indigo-500/20 px-10"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, idx) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-50 flex flex-wrap justify-between items-center gap-6">
                  <div className="flex gap-10">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Order Placed
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Total Amount
                      </p>
                      <p className="text-sm font-bold text-indigo-600">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                    <div className="space-y-1 hidden sm:block">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Order ID
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${getStatusColor(order.status)}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-10">
                    {/* Product List */}
                    <div className="flex-1 space-y-6">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex gap-6 items-center group">
                          <div className="w-16 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                            <img
                              src={item.product?.imageUrl}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {item.product?.name}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">
                              Qty: {item.quantity} • ${item.price}
                            </p>
                          </div>
                          <Link
                            to={`/product/${item.product?._id}`}
                            className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* Action Column */}
                    <div className="md:w-64 space-y-4">
                      <Link
                        to={`/order/${order._id}`}
                        className="w-full btn bg-indigo-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-700 transition-colors !py-4"
                      >
                        Order Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button className="w-full btn bg-white border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-colors !py-4">
                        Track Shipment
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

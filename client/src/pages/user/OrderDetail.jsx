import { useParams, Link } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../features/orders/orderApi";
import {
  Package,
  Truck,
  MapPin,
  CreditCard,
  Calendar,
  ChevronLeft,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

const OrderDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetOrderByIdQuery(id);
  const order = data?.order;

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

  if (isLoading)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );

  if (isError || !order)
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <XCircle className="w-20 h-20 text-red-100 mx-auto mb-6" />
        <h2 className="text-3xl font-black text-gray-900 mb-4 font-heading">
          Order Not Found
        </h2>
        <p className="text-gray-500 mb-10">
          We couldn't retrieve the details for this order ID.
        </p>
        <Link to="/orders" className="btn btn-primary">
          Back to Orders
        </Link>
      </div>
    );

  return (
    <div className="bg-[#fcfcfd] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/orders"
          className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 mb-12 group font-bold tracking-widest text-xs uppercase"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to History
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-12">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h1 className="text-4xl font-black text-gray-900 font-heading">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h1>
                <p className="text-gray-500 mt-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    dateStyle: "long",
                  })}
                </p>
              </div>
              <div
                className={`px-6 py-2 rounded-full border text-xs font-black uppercase tracking-widest flex items-center gap-2 ${getStatusColor(order.status)}`}
              >
                {order.status}
              </div>
            </div>

            {/* Items Card */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 bg-gray-50/30">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <Package className="w-4 h-4 text-indigo-600" />
                  Order Items ({order.items.length})
                </h3>
              </div>
              <div className="p-8 space-y-8">
                {order.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-24 h-32 bg-gray-50 rounded-2xl overflow-hidden border border-gray-50 flex-shrink-0">
                      <img
                        src={item.product?.imageUrl}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                        {item.product?.name}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1 font-bold">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-gray-900 font-heading">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                      <Link
                        to={`/product/${item.product?._id}`}
                        className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1 justify-end mt-2 uppercase tracking-widest"
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Summary Grid for Mobile */}
            <div className="lg:hidden bg-white p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                Payment Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-500 font-bold">
                  <span>Subtotal</span>
                  <span className="text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500 font-bold">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="h-px bg-gray-50"></div>
                <div className="flex justify-between text-2xl font-black text-indigo-600">
                  <span>Total</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-8 sticky top-28">
            {/* Delivery Info */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Truck className="w-20 h-20" />
              </div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Delivery To
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-black text-gray-900 font-heading capitalize">
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    {order.shippingAddress.email}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-50">
                  <p className="text-sm text-gray-600 leading-relaxed font-bold">
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Billing Info */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Billing Details
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between text-gray-500 font-bold">
                  <span>Amount</span>
                  <span className="text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500 font-bold">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="h-px bg-gray-50"></div>
                <div className="flex justify-between text-3xl font-black text-indigo-600 font-heading">
                  <span className="text-gray-900 text-sm mb-1 self-end uppercase tracking-[0.2em]">
                    Total
                  </span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-indigo-600 rounded-3xl text-white text-center shadow-xl shadow-indigo-500/20 group">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">
                Need Support?
              </p>
              <h4 className="font-bold text-sm mb-4 tracking-tight">
                Nexus Concierge is available 24/7
              </h4>
              <button className="w-full bg-white text-indigo-600 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-50 transition-colors group-hover:scale-105 duration-300">
                Contact Agent
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

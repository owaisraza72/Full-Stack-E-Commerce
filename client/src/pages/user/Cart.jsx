import { motion } from "framer-motion";
import {
  ShoppingBag,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  PackageOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../features/cart/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8">
          <PackageOpen className="w-16 h-16 text-gray-200" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4 font-heading text-center">
          Your Bag is Empty
        </h2>
        <p className="text-gray-500 mb-10 max-w-sm text-center leading-relaxed">
          Looks like you haven't added anything to your cart yet. Explore our
          premium collection and find something special!
        </p>
        <Link
          to="/"
          className="btn btn-primary shadow-xl shadow-indigo-500/20 px-10"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfd] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 font-heading">
            Your Shopping Bag
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
            <p className="text-gray-500 font-bold text-sm tracking-wide uppercase">
              {cartItems.length} Products Selected
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-8 group hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
              >
                <div className="w-full sm:w-40 h-48 rounded-3xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-50">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="flex-1 space-y-4 text-center sm:text-left">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-black text-gray-900 mt-2 font-heading">
                      {item.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-8">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Price
                      </p>
                      <p className="text-xl font-black text-indigo-600 font-heading">
                        ${item.price}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Quantity
                      </p>
                      <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item._id,
                                quantity: item.quantity - 1,
                              }),
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all font-black text-lg active:scale-90"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-black text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item._id,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all font-black text-lg active:scale-90"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all self-end mb-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-indigo-500/5 sticky top-28 space-y-10">
              <h2 className="text-2xl font-black text-gray-900 font-heading underline decoration-indigo-200 decoration-8 underline-offset-8">
                Bill Summary
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-gray-500 font-bold">
                  <span className="text-sm uppercase tracking-widest">
                    Subtotal
                  </span>
                  <span className="text-xl text-gray-900 font-black">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-500 font-bold">
                  <span className="text-sm uppercase tracking-widest">
                    Shipping
                  </span>
                  <span className="text-green-600 font-black uppercase text-xs tracking-widest bg-green-50 px-4 py-1.5 rounded-full border border-green-100">
                    Free
                  </span>
                </div>
                <div className="h-px bg-gray-100"></div>
                <div className="flex justify-between items-center text-gray-900 border-t border-indigo-50 pt-6">
                  <span className="text-sm font-black uppercase tracking-[0.2em]">
                    Total Amount
                  </span>
                  <span className="text-4xl font-black text-indigo-600 font-heading">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full btn btn-primary !py-6 !rounded-[2rem] flex items-center justify-center gap-4 shadow-2xl shadow-indigo-500/40 text-lg group"
              >
                Proceed to Checkout
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="pt-6 border-t border-gray-50">
                <p className="text-[10px] text-gray-400 font-black text-center uppercase tracking-[0.15em] leading-relaxed">
                  Complimentary Nexus Shipping <br />
                  Secure 256-bit SSL encryption <br />
                  60-day world-class return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

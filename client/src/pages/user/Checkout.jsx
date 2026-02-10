import { motion } from "framer-motion";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
  Package,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useCreateOrderMutation } from "../../features/orders/orderApi";
import { clearCart } from "../../features/cart/cartSlice";
import toast from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Fetch user and cart data from Redux store
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  // RTK Query mutation for creating an order
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  // Local state for shipping address details
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "", // Auto-fill email if user is logged in
    address: "",
    city: "",
    postalCode: "",
  });

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Prevent placing order if cart is empty
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Format order data for the backend API
    const orderData = {
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: total,
      shippingAddress: address,
    };

    try {
      // Trigger API call and wait for response
      await createOrder(orderData).unwrap();
      toast.success("Order placed successfully!");
      // Clear cart on success and navigate to orders page
      dispatch(clearCart());
      navigate("/orders");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to place order");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <Package className="w-16 h-16 text-gray-200 mb-6" />
        <h2 className="text-2xl font-black text-gray-900 mb-4">
          No items for checkout
        </h2>
        <Link to="/" className="btn btn-primary px-10">
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfd] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/cart"
          className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 mb-10 group font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" />
          Back to Cart
        </Link>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20"
        >
          {/* Checkout Form */}
          <div className="space-y-12">
            <header>
              <h1 className="text-4xl font-black text-gray-900 font-heading">
                Secure Checkout
              </h1>
              <p className="text-gray-500 mt-2">
                Finish your order by providing details below
              </p>
            </header>

            <section className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                  <Truck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Shipping Information
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstName"
                  value={address.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="input col-span-1"
                  required
                />
                <input
                  name="lastName"
                  value={address.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="input col-span-1"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={address.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="input col-span-2"
                  required
                />
                <input
                  name="address"
                  value={address.address}
                  onChange={handleInputChange}
                  placeholder="Shipping Address"
                  className="input col-span-2"
                  required
                />
                <input
                  name="city"
                  value={address.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="input"
                  required
                />
                <input
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleInputChange}
                  placeholder="Postal Code"
                  className="input"
                  required
                />
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Payment Selection
                </h2>
              </div>

              <div className="space-y-4">
                <div className="p-5 border-2 border-indigo-600 bg-indigo-50/30 rounded-2xl flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gray-900 rounded flex items-center justify-center text-[10px] text-white font-black italic">
                      VISA
                    </div>
                    <span className="font-bold text-gray-900">
                      Credit or Debit Card
                    </span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-4 border-indigo-600"></div>
                </div>
                <p className="text-xs text-gray-400 italic ml-1">
                  PayPal and other methods are currently disabled for
                  maintenance.
                </p>
              </div>
            </section>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary !py-6 !rounded-[2rem] text-xl shadow-2xl shadow-indigo-500/30 group disabled:opacity-50"
            >
              {isLoading ? "Processing Order..." : "Place Order Now"}
              {!isLoading && (
                <ArrowRight className="w-6 h-6 inline-block ml-3 group-hover:translate-x-1" />
              )}
            </button>
          </div>

          {/* Cart Sidebar */}
          <div className="hidden lg:block lg:pl-20 border-l border-gray-100">
            <div className="sticky top-28 space-y-8">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">
                Order Review ({cartItems.length} Items)
              </h3>

              <div className="max-h-[40vh] overflow-y-auto pr-4 space-y-6 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-6">
                    <div className="w-20 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-50">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-indigo-600 font-black mt-1">
                        Qty: {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <span className="font-black text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-100">
                <div className="flex justify-between text-gray-500 font-bold">
                  <span>Subtotal</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-bold">
                  <span>Shipping</span>
                  <span className="text-green-600 uppercase text-xs tracking-widest font-black">
                    Free
                  </span>
                </div>
                <div className="flex justify-between text-3xl font-black text-indigo-600 pt-6">
                  <span className="text-gray-900 text-lg">Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl flex items-center gap-6 border border-gray-100 shadow-sm">
                <ShieldCheck className="w-12 h-12 text-indigo-600 flex-shrink-0" />
                <div>
                  <p className="font-black text-gray-900 text-sm">
                    Nexus Protection Enabled
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium mt-1">
                    Your purchase is secured by world-class encryption and a
                    60-day guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

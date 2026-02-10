import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useGetProductQuery } from "../../features/products/productApi";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowLeft,
  PackageSearch,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../features/cart/cartSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Get product ID from URL params

  const { user } = useSelector((state) => state.auth);
  // Fetch product data using RTK Query
  const { data, isLoading, isError } = useGetProductQuery(id);

  // Local state for selecting quantity
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (qty = quantity) => {
    if (!user) {
      toast.error("Please log in to add items to your cart");
      navigate("/login", {
        state: {
          from: `/product/${id}`,
          action: "add_to_cart",
          quantity: qty,
        },
      });
      return;
    }

    if (!data?.product) return;

    dispatch(addToCart({ ...data.product, quantity: qty }));
    toast.success(`${data.product.name} added to cart!`);
  };

  useEffect(() => {
    if (user && location.state?.action === "add_to_cart" && data?.product) {
      const savedQty = location.state?.quantity || 1;
      handleAddToCart(savedQty);
      // Clear state to avoid repeat on refresh
      window.history.replaceState({}, document.title);
    }
  }, [user, location.state, data?.product]);

  if (isLoading)
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-bold animate-pulse font-heading">
          Fetching product details...
        </p>
      </div>
    );

  if (isError || !data?.product)
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <PackageSearch className="w-24 h-24 text-gray-200 mx-auto mb-8" />
        <h2 className="text-4xl font-black text-gray-900 mb-4 font-heading">
          Product Not Found
        </h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
          The product you're looking for might have been removed or doesn't
          exist in our current collection.
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary shadow-xl shadow-indigo-500/30"
        >
          Return to Nexus Home
        </button>
      </div>
    );

  const { product } = data;

  return (
    <div className="bg-[#fcfcfd] py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors mb-12 group font-bold tracking-widest text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Image Display */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-28"
          >
            <div className="aspect-[4/5] bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-2xl shadow-indigo-500/5 group">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            {/* Seller Badge */}
            <div className="mt-8 p-6 bg-white rounded-3xl border border-gray-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center font-bold text-indigo-600 text-xl border border-indigo-100">
                  {product.seller?.name?.charAt(0) || "N"}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Verified Seller
                  </p>
                  <p className="font-bold text-gray-900">
                    {product.seller?.name || "Nexus Official"}
                  </p>
                </div>
              </div>
              <button className="text-indigo-600 font-bold text-sm hover:underline">
                View Store
              </button>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-5 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-indigo-100">
                  {product.category}
                </span>
                <div className="flex items-center gap-3">
                  <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-red-500 transition-colors shadow-sm hover:shadow-md">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-indigo-600 transition-colors shadow-sm hover:shadow-md">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-4xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight font-heading">
                {product.name}
              </h1>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? "fill-current" : "fill-none"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-400 font-bold text-sm">
                  4.8 (124 reviews)
                </span>
                <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                <span
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${product.stock > 0 ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"}`}
                >
                  {product.stock > 0 ? "Limited Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-indigo-500/5 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>

              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-black text-gray-900 font-heading">
                  ${product.price}
                </span>
                <span className="text-gray-300 line-through font-bold text-xl">
                  ${(product.price * 1.25).toFixed(0)}
                </span>
              </div>

              <p className="text-gray-500 leading-relaxed text-lg italic">
                "{product.description}"
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <div className="flex items-center bg-gray-50 rounded-2xl p-2 w-full sm:w-auto border border-gray-100">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center font-black text-2xl hover:bg-white rounded-xl transition-all active:scale-90"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-black text-xl font-heading">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center font-black text-2xl hover:bg-white rounded-xl transition-all active:scale-90"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart()}
                  className="flex-1 w-full py-6 bg-gray-900 text-white font-black rounded-3xl hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-4 active:scale-[0.98]"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="text-lg">Secure Add to Cart</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Truck,
                  title: "Global Shipping",
                  desc: "Secure worldwide delivery",
                },
                {
                  icon: RotateCcw,
                  title: "Nexus Returns",
                  desc: "Extended 60-day window",
                },
                {
                  icon: ShieldCheck,
                  title: "Certified quality",
                  desc: "Nexus premium guaranteed",
                },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-8 bg-white rounded-[2rem] border border-gray-50 hover:border-indigo-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                    <feat.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h5 className="font-bold text-gray-900 text-sm mb-1">
                    {feat.title}
                  </h5>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

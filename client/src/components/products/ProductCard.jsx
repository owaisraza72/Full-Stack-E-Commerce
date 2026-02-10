import React, { useState } from "react";
import {
  Heart,
  Star,
  ShoppingCart,
  Eye,
  Share2,
  Check,
  TrendingUp,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";
import toast from "react-hot-toast";

// Main Product Card Component
export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success("Added to wishlist!", { icon: "❤️" });
    } else {
      toast.success("Removed from wishlist");
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please log in to add items to your cart");
      navigate("/login", {
        state: {
          from: "/",
          action: "add_to_cart",
          product: product, // Store product to add after login if needed or just redirect
        },
      });
      return;
    }

    // Actually dispatch the action to add product to cart
    dispatch(addToCart({ ...product, quantity: 1 }));

    toast.success(`${product.name} added to cart!`, {
      style: {
        background: "#333",
        color: "#fff",
        borderRadius: "1rem",
      },
      icon: "🛒",
    });
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <div className="group relative animate-fadeIn">
        <Link to={`/product/${product._id}`} className="block">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
            {/* Badge - New/Sale/Trending */}
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <div
                  className={`px-4 py-2 rounded-full backdrop-blur-md font-light text-xs tracking-widest flex items-center gap-2 shadow-lg ${
                    product.badge === "NEW"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : product.badge === "SALE"
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white"
                        : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                  }`}
                >
                  {product.badge === "TRENDING" && (
                    <TrendingUp className="w-3 h-3" />
                  )}
                  {product.badge}
                </div>
              </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quick Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                <button
                  onClick={handleWishlist}
                  className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg ${
                    isWishlisted
                      ? "bg-rose-500 text-white"
                      : "bg-white/90 text-gray-700 hover:bg-white"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>

                <button
                  onClick={handleQuickView}
                  className="w-11 h-11 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg text-gray-700"
                  aria-label="Quick view"
                >
                  <Eye className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toast.success("Link copied!");
                  }}
                  className="w-11 h-11 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg text-gray-700"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Action Bar - Shows on Hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-3.5 bg-white text-gray-900 font-light tracking-widest rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5" />
                  ADD TO CART
                </button>
              </div>

              {/* Price Tag - Top Right */}
              <div className="absolute top-4 right-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                  <span className="text-lg font-light text-gray-900">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              {/* Title and Rating */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-light text-gray-900 group-hover:text-amber-600 transition-colors duration-300 flex-1 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 ml-3 flex-shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-600 font-light">
                    {product.rating || "5.0"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-sm font-light line-clamp-2 mb-4 italic leading-relaxed">
                "{product.description}"
              </p>

              {/* Price and Category Info */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-light text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through font-light">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <span className="text-xs tracking-widest text-amber-600 font-light uppercase">
                  {product.category}
                </span>
              </div>

              {/* Seller Info */}
              {product.seller && (
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <p className="text-xs text-gray-400 font-light">
                    by{" "}
                    <span className="text-gray-600">
                      {product.seller.name || "Premium Partner"}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

// Compact Product Card for Sidebars/Lists
export const CompactProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-100"
    >
      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-light text-gray-900 truncate group-hover:text-amber-600 transition-colors">
          {product.name}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-amber-600 font-light">${product.price}</p>
          {product.originalPrice && (
            <p className="text-xs text-gray-400 line-through">
              ${product.originalPrice}
            </p>
          )}
        </div>
      </div>
      <Star className="w-4 h-4 fill-amber-400 text-amber-400 flex-shrink-0" />
    </Link>
  );
};

// Loading Skeleton
export const ProductCardSkeleton = () => {
  return (
    <div className="rounded-3xl bg-white shadow-lg overflow-hidden border border-gray-100 animate-pulse">
      <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="p-6">
        <div className="flex justify-between mb-3">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-12" />
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="flex justify-between pt-4 border-t border-gray-100">
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
};

// Demo Grid Component
const ProductGrid = () => {
  const sampleProducts = [
    {
      _id: "1",
      name: "Silk Evening Gown",
      description: "Handcrafted luxury silk with pearl embellishments",
      price: 890,
      originalPrice: 1200,
      imageUrl:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      category: "Fashion",
      badge: "SALE",
      rating: 4.9,
      seller: { name: "Maison Élégance" },
    },
    {
      _id: "2",
      name: "Italian Leather Handbag",
      description: "Premium full-grain leather with gold hardware",
      price: 1250,
      imageUrl:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
      category: "Accessories",
      badge: "NEW",
      rating: 5.0,
      seller: { name: "Milano Craft" },
    },
    {
      _id: "3",
      name: "Diamond Pendant Necklace",
      description: "Ethically sourced diamonds set in 18k white gold",
      price: 2450,
      imageUrl:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop",
      category: "Jewelry",
      badge: "TRENDING",
      rating: 5.0,
      seller: { name: "Lumière Jewels" },
    },
    {
      _id: "4",
      name: "Cashmere Sweater",
      description: "Pure cashmere knit with ribbed detailing",
      price: 450,
      imageUrl:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
      category: "Fashion",
      rating: 4.8,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-3">
            Featured Collection
          </h1>
          <p className="text-gray-500 font-light">
            Handpicked selections from our exclusive designers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {sampleProducts.map((product, index) => (
            <div
              key={product._id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-light text-gray-900 mb-6">
            Recently Viewed
          </h2>
          <div className="space-y-2">
            {sampleProducts.slice(0, 3).map((product) => (
              <CompactProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductGrid;

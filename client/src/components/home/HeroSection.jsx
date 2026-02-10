import { motion } from "framer-motion";
import { FaArrowRight, FaCrown, FaGem } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const premiumImages = {
  luxuryBg: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
};

export const HeroSection = ({ trendingProducts }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background with Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src={premiumImages.luxuryBg}
          alt="Luxury Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-tl from-violet-500/20 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Luxury Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm rounded-full border border-amber-500/20">
              <FaCrown className="text-amber-500" />
              <span className="text-sm font-light tracking-widest text-amber-300">
                EXCLUSIVE COLLECTION
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-light text-white leading-tight mb-6 tracking-tight">
              Elevate Your
              <span className="block font-serif italic bg-gradient-to-r from-amber-300 via-rose-300 to-white bg-clip-text text-transparent">
                Living Experience
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl font-light">
              Discover meticulously curated luxury collections that redefine
              elegance. Where exceptional craftsmanship meets timeless design.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/products")}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-rose-600 text-white font-light tracking-widest rounded-full hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  EXPLORE COLLECTION
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-transparent text-white font-light tracking-widest rounded-full border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                VIEW CATALOG
              </motion.button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "10K+", label: "Premium Products" },
                { value: "200+", label: "Designer Brands" },
                { value: "24/7", label: "Concierge Service" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-light text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Product Showcase */}
          <HeroProductShowcase trendingProducts={trendingProducts} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 tracking-widest">
            EXPLORE
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-amber-400 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

const HeroProductShowcase = ({ trendingProducts }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      <div className="relative grid grid-cols-2 gap-4">
        {trendingProducts?.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className={`relative group cursor-pointer ${
              index === 0 ? "col-span-2" : ""
            }`}
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-light text-sm truncate">
                      {product.name}
                    </h3>
                    <p className="text-amber-300 text-lg font-light">
                      ${product.price}
                    </p>
                  </div>
                  <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <FaArrowRight className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Badge */}
      <div className="absolute -top-4 -right-4">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full animate-spin-slow">
            <div className="absolute inset-2 bg-black rounded-full" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaGem className="text-amber-400 text-2xl" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
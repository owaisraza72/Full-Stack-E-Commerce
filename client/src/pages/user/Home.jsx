import { useGetAllProductsQuery } from "../../features/products/productApi";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaStar,
  FaArrowRight,
  FaSearch,
  FaChevronRight,
  FaHeart,
  FaShoppingBag,
  FaCrown,
  FaGem,
} from "react-icons/fa";
import { MdLocalOffer, MdSecurity } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";

// Premium Image URLs (Replace with your actual image URLs)
const premiumImages = {
  heroMain:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  heroSecondary:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  shipping:
    "https://images.unsplash.com/photo-1543258103-2151c3b40f9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  security:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  discount:
    "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  returns:
    "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  testimonial1:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  testimonial2:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w-400&q=80",
  testimonial3:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  categoryElectronics:
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  categoryFashion:
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  categoryHome:
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  categoryBeauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  luxuryBg:
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
};

const Home = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-transparent rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 p-1 animate-spin">
            <div className="w-full h-full bg-white rounded-full"></div>
          </div>
          <FaGem className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-amber-600" />
        </div>
        <p className="text-lg font-light text-gray-600 tracking-widest animate-pulse">
          CURATING LUXURY COLLECTION
        </p>
        <div className="mt-8 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="text-center max-w-md">
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-transparent rounded-full bg-gradient-to-r from-rose-500 to-pink-500 p-1 animate-pulse">
                <div className="w-full h-full bg-white rounded-full"></div>
              </div>
              <MdSecurity className="text-4xl text-rose-600 relative z-10" />
            </div>
          </div>
          <h2 className="text-3xl font-light text-gray-800 mb-3 tracking-tight">
            Collection Unavailable
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Our luxury curation service is currently undergoing maintenance.
            Please return shortly for an enhanced shopping experience.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white font-light tracking-widest rounded-full hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">REFRESH EXPERIENCE</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    );

  const categories = [
    "All",
    ...new Set(data?.products?.map((p) => p.category)),
  ];

  const filteredProducts = data?.products?.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredCategories = [
    {
      name: "Electronics",
      image: premiumImages.categoryElectronics,
      count:
        data?.products?.filter((p) => p.category === "Electronics").length || 0,
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      name: "Fashion",
      image: premiumImages.categoryFashion,
      count:
        data?.products?.filter((p) => p.category === "Clothing").length || 0,
      gradient: "from-rose-500 to-pink-400",
    },
    {
      name: "Home",
      image: premiumImages.categoryHome,
      count: data?.products?.filter((p) => p.category === "Home").length || 0,
      gradient: "from-amber-500 to-orange-400",
    },
    {
      name: "Beauty",
      image: premiumImages.categoryBeauty,
      count: data?.products?.filter((p) => p.category === "Beauty").length || 0,
      gradient: "from-purple-500 to-violet-400",
    },
  ];

  const testimonials = [
    {
      name: "Sophia Laurent",
      role: "Fashion Editor, Vogue",
      content:
        "An exceptional curation of luxury goods. Each piece tells a story of craftsmanship and elegance.",
      image: premiumImages.testimonial1,
      rating: 5,
    },
    {
      name: "Alexander Chen",
      role: "Tech Executive",
      content:
        "The attention to detail and quality assurance is unparalleled. My go-to destination for premium electronics.",
      image: premiumImages.testimonial2,
      rating: 5,
    },
    {
      name: "Isabella Rossi",
      role: "Interior Designer",
      content:
        "Transformative home pieces that blend artistry with functionality. Simply breathtaking collections.",
      image: premiumImages.testimonial3,
      rating: 5,
    },
  ];

  const trendingProducts = data?.products?.slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>

      {/* Hero Section - Luxury */}
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative grid grid-cols-2 gap-4">
                {trendingProducts.map((product, index) => (
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

      {/* Premium Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Uncompromising Excellence
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-light">
              Every aspect of our service is designed to provide an unparalleled
              luxury experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                image: premiumImages.shipping,
                title: "White Glove Delivery",
                desc: "Hand-delivered by our concierge team with full setup service",
                icon: <FaShoppingBag className="text-amber-600" />,
              },
              {
                image: premiumImages.security,
                title: "Absolute Security",
                desc: "Bank-level encryption and fraud protection for all transactions",
                icon: <HiShieldCheck className="text-rose-600" />,
              },
              {
                image: premiumImages.discount,
                title: "Exclusive Access",
                desc: "Priority access to limited editions and private collections",
                icon: <MdLocalOffer className="text-violet-600" />,
              },
              {
                image: premiumImages.returns,
                title: "Effortless Returns",
                desc: "365-day return policy with complimentary pickup service",
                icon: <FaHeart className="text-blue-600" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-light text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-light">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-light tracking-widest text-amber-300">
                  CURATED COLLECTIONS
                </span>
              </div>
              <h2 className="text-4xl font-light text-white">
                Explore By Category
              </h2>
            </div>
            <button className="text-white font-light tracking-widest flex items-center gap-2 hover:text-amber-300 transition-colors">
              VIEW ALL
              <FaChevronRight />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredCategories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => {
                  setSelectedCategory(category.name);
                  navigate("/");
                }}
                className="group relative h-64 rounded-3xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-300`}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-light text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm font-light">
                    {category.count} luxury items
                  </p>
                  <div className="h-px w-0 group-hover:w-full bg-white transition-all duration-500 mt-4" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Products Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            {searchQuery ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <FaSearch className="text-amber-600 text-2xl" />
                  <h1 className="text-4xl font-light text-gray-900">
                    Search Results:
                    <span className="text-amber-600 ml-3">"{searchQuery}"</span>
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-gray-500 font-light">
                    Found {filteredProducts?.length} premium matches
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="text-amber-600 font-light hover:text-amber-700 hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <h2 className="text-4xl font-light text-gray-900 mb-2">
                    Featured Collection
                  </h2>
                  <p className="text-gray-500 font-light max-w-xl">
                    Handpicked selections from our most exclusive designers and
                    artisans
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 6).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full font-light transition-all duration-300 ${
                        selectedCategory === cat
                          ? "bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Products Grid */}
          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProducts?.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Link to={`/product/${product._id}`}>
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-2xl transition-all duration-500">
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Price Tag */}
                        <div className="absolute top-4 right-4">
                          <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                            <span className="text-lg font-light text-gray-900">
                              ${product.price}
                            </span>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                            <FaHeart className="text-rose-500" />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-light text-gray-900 group-hover:text-amber-600 transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <FaStar className="text-amber-400" />
                            <span className="text-sm text-gray-500">5.0</span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm font-light line-clamp-2 mb-4 italic">
                          "{product.description}"
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-xs tracking-widest text-amber-600 font-light">
                            {product.category}
                          </span>
                          <span className="text-xs text-gray-400 font-light">
                            {product.seller?.name || "Premium Partner"}
                          </span>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                        <button className="w-full px-6 py-3 bg-white text-gray-900 font-light tracking-widest rounded-xl hover:bg-gray-50 transition-colors">
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProducts?.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12"
            >
              <div className="text-center py-20 bg-gradient-to-r from-gray-50 to-white rounded-3xl border-2 border-dashed border-gray-200">
                <div className="w-24 h-24 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="text-3xl text-amber-600" />
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-3">
                  No Products Found
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto font-light">
                  We couldn't find any products matching your criteria. Try
                  exploring our featured collections.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    navigate("/");
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-gray-900 to-black text-white font-light tracking-widest rounded-full hover:shadow-xl transition-all"
                >
                  BROWSE ALL COLLECTIONS
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Voices of Distinction
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-light">
              Hear from our esteemed clients about their luxury shopping
              experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                  {/* Testimonial Image */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full flex items-center justify-center">
                      <FaCrown className="text-white text-sm" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-lg italic mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div>
                    <h4 className="font-light text-gray-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm font-light">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute -z-10 top-4 left-4 w-full h-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 rounded-3xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FaGem className="text-amber-400 text-4xl mx-auto mb-6" />
            <h2 className="text-4xl font-light text-white mb-4">
              Begin Your Luxury Journey
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 font-light">
              Join our exclusive community of discerning clients who appreciate
              the finer things in life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-rose-600 text-white font-light tracking-widest rounded-full hover:shadow-2xl hover:shadow-amber-500/30 transition-all">
                CREATE ACCOUNT
              </button>
              <button className="px-8 py-4 bg-transparent text-white font-light tracking-widest rounded-full border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all">
                SCHEDULE CONSULTATION
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

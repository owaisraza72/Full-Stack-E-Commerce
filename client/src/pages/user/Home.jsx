import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useGetAllProductsQuery } from "../../features/products/productApi";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { HeroSection } from "../../components/home/HeroSection";
import { CategoriesSection } from "../../components/home/CategoriesSection";
import { ProductsGrid } from "../../components/products/ProductsGrid";
import { CTASection } from "../../components/home/CTASection";

const Home = () => {
  // Fetch all products on home page load
  const { data, isLoading, isError } = useGetAllProductsQuery();
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  // Extract search query from URL if present (Home page won't handle search anymore, it's moved to /products)
  // const searchQuery = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;

  const categories = [
    "All",
    ...new Set(data?.products?.map((p) => p.category)),
  ];

  const filteredProducts = data?.products?.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesCategory;
  });

  const featuredCategories = [
    {
      name: "Electronics",
      count:
        data?.products?.filter((p) => p.category === "Electronics").length || 0,
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      name: "Fashion",
      count:
        data?.products?.filter((p) => p.category === "Clothing").length || 0,
      gradient: "from-rose-500 to-pink-400",
    },
    {
      name: "Home",
      count: data?.products?.filter((p) => p.category === "Home").length || 0,
      gradient: "from-amber-500 to-orange-400",
    },
    {
      name: "Beauty",
      count: data?.products?.filter((p) => p.category === "Beauty").length || 0,
      gradient: "from-purple-500 to-violet-400",
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

      <HeroSection trendingProducts={trendingProducts} />
      <CategoriesSection
        featuredCategories={featuredCategories}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductsGrid
        filteredProducts={filteredProducts?.slice(0, 4)}
        searchQuery=""
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="max-w-7xl mx-auto px-4 pb-20 -mt-10">
        <div className="flex justify-center">
          <Link
            to="/products"
            className="group flex items-center gap-3 px-10 py-5 bg-white border border-gray-200 text-gray-900 font-light tracking-widest rounded-2xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 shadow-xl shadow-gray-200/50"
          >
            EXPLORE FULL COLLECTION
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>

      <CTASection />
    </div>
  );
};

export default Home;

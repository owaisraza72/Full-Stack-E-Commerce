import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useGetAllProductsQuery } from "../../features/products/productApi";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { ProductsGrid } from "../../components/products/ProductsGrid";
import { Gem, Sparkles, Filter } from "lucide-react";

/**
 * AllProducts Page
 * Displays the complete set of products with full filtering capabilities.
 */
const AllProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

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
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] -ml-64 -mb-64" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-light text-white tracking-[0.2em] uppercase">
              Premium Collection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-light text-white mb-6 tracking-tight font-heading"
          >
            Discover <span className="italic font-serif">Luxury</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto font-light text-lg leading-relaxed"
          >
            Explore our curated catalog of exclusive products crafted by the
            world's most talented designers.
          </motion.p>
        </div>
      </section>

      {/* Main Grid Section */}
      <div className="relative -mt-10 z-20">
        <ProductsGrid
          filteredProducts={filteredProducts}
          searchQuery={searchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};

export default AllProducts;

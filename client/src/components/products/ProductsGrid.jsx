import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { ProductCard } from "./ProductCard"; // Import from separate file

export const ProductsGrid = ({ 
  filteredProducts, 
  searchQuery, 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const navigate = useNavigate();

  if (filteredProducts?.length === 0) {
    return <EmptyState setSelectedCategory={setSelectedCategory} navigate={navigate} />;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ProductsHeader 
          searchQuery={searchQuery} 
          filteredProducts={filteredProducts}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          navigate={navigate}
        />

        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const ProductsHeader = ({ 
  searchQuery, 
  filteredProducts,
  categories,
  selectedCategory,
  setSelectedCategory,
  navigate 
}) => {
  if (searchQuery) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
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
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-light text-gray-900 mb-2">
            Featured Collection
          </h2>
          <p className="text-gray-500 font-light max-w-xl">
            Handpicked selections from our most exclusive designers and artisans
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
    </motion.div>
  );
};

const EmptyState = ({ setSelectedCategory, navigate }) => {
  return (
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
  );
};
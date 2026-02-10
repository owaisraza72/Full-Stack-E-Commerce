import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const premiumImages = {
  categoryElectronics: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  categoryFashion: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  categoryHome: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  categoryBeauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
};

export const CategoriesSection = ({ 
  featuredCategories, 
  setSelectedCategory 
}) => {
  const navigate = useNavigate();

  return (
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
            <CategoryCard 
              key={category.name} 
              category={category} 
              index={index}
              setSelectedCategory={setSelectedCategory}
              navigate={navigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ category, index, setSelectedCategory, navigate }) => {
  return (
    <motion.button
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
        src={category.image || premiumImages[`category${category.name}`]}
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
  );
};
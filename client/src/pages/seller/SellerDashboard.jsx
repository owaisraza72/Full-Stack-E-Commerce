import { useState } from "react";
import {
  useAddProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../features/products/productApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: productsData, isLoading: productsLoading } =
    useGetAllProductsQuery();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Adding product...");
    try {
      await addProduct(form).unwrap();
      toast.success("Product added successfully!", { id: loadToast });
      setShowAddForm(false);
      setForm({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        category: "",
        stock: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add product", {
        id: loadToast,
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted");
      } catch (err) {
        toast.error("Failed to delete product");
      }
    }
  };

  const sellerProducts =
    productsData?.products?.filter((p) => p.seller?._id === user?._id) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-gray-900">
            Seller Dashboard
          </h1>
          <p className="text-gray-500">
            Manage your product inventory and sales.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`btn ${showAddForm ? "btn-secondary" : "btn-primary"} shadow-lg`}
        >
          {showAddForm ? "Cancel" : "+ Add New Product"}
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <form
              onSubmit={handleSubmit}
              className="card grid grid-cols-1 md:grid-cols-2 gap-6 bg-indigo-50/30 border-indigo-100"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Product Name
                </label>
                <input
                  name="name"
                  placeholder="E.g. Vintage Leather Jacket"
                  className="input w-full"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Price ($)
                </label>
                <input
                  name="price"
                  type="number"
                  placeholder="99.99"
                  className="input w-full"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Category
                </label>
                <input
                  name="category"
                  placeholder="E.g. Apparel"
                  className="input w-full"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Stock Quantity
                </label>
                <input
                  name="stock"
                  type="number"
                  placeholder="50"
                  className="input w-full"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Image URL
                </label>
                <input
                  name="imageUrl"
                  placeholder="https://images.unsplash.com/..."
                  className="input w-full"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your product in detail..."
                  className="input w-full min-h-[100px]"
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                disabled={isAdding}
                className="btn btn-primary md:col-span-2 mt-2"
              >
                {isAdding ? "Publishing..." : "Publish Product"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsLoading ? (
          <p>Loading your products...</p>
        ) : (
          sellerProducts.map((product) => (
            <div key={product._id} className="card relative group">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold font-heading">{product.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-indigo-600 font-bold">
                  ${product.price}
                </span>
                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500 font-medium">
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex gap-2 mt-6">
                <Link
                  to={`/edit-product/${product._id}`}
                  className="flex-1 py-2 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="p-2 text-red-500 border border-red-100 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}

        {!productsLoading && sellerProducts.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">
              You haven't added any products yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;

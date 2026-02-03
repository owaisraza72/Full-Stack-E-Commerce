import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../features/products/productApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Package,
  Tag,
  DollarSign,
  Image as ImageIcon,
  Layers,
  Boxes,
  Save,
  ArrowLeft,
} from "lucide-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: productData, isLoading: isFetching } = useGetProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (productData?.product) {
      const { name, price, description, imageUrl, category, stock } =
        productData.product;
      setForm({ name, price, description, imageUrl, category, stock });
    }
  }, [productData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Saving changes...");
    try {
      await updateProduct({ id, ...form }).unwrap();
      toast.success("Product updated successfully!", { id: loadToast });
      navigate("/seller");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update product", {
        id: loadToast,
      });
    }
  };

  if (isFetching)
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-bold font-heading">
          Loading listing details...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors mb-10 group font-bold tracking-widest text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Cancel & Return
        </button>

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-500/5 border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 bg-indigo-600 p-12 text-white flex flex-col justify-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mb-8">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-black mb-6 leading-tight font-heading">
                Refine Your <br />
                Listing
              </h1>
              <p className="text-indigo-100 font-medium leading-relaxed opacity-80">
                Update your product details to keep your buyers informed.
                High-quality info drives more sales.
              </p>
              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  Live updates
                </div>
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  Optimized for Nexus
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="lg:col-span-3 p-12 space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    Product Title
                  </label>
                  <div className="relative">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="input w-full pl-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    Price ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="price"
                      type="number"
                      required
                      value={form.price}
                      onChange={handleChange}
                      className="input w-full pl-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    Stock
                  </label>
                  <div className="relative">
                    <Boxes className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="stock"
                      type="number"
                      required
                      value={form.stock}
                      onChange={handleChange}
                      className="input w-full pl-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    Category
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="category"
                      type="text"
                      required
                      value={form.category}
                      onChange={handleChange}
                      className="input w-full pl-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    Image URL
                  </label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="imageUrl"
                      type="url"
                      required
                      value={form.imageUrl}
                      onChange={handleChange}
                      className="input w-full pl-12"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    Description
                  </label>
                  <div className="relative">
                    <Layers className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      name="description"
                      required
                      rows="4"
                      value={form.description}
                      onChange={handleChange}
                      className="input w-full pl-12 min-h-[120px] resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 btn btn-primary py-4 font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/30"
                >
                  {isUpdating ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

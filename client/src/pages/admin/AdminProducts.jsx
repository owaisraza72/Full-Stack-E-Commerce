import { useState } from "react";
import {
  useGetAllProductsAdminQuery,
  useDeleteAnyProductMutation,
  useUpdateAnyProductMutation,
  useAddProductAdminMutation,
} from "../../features/admin/adminApi";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const AdminProducts = () => {
  const [addProduct, { isLoading: isAdding }] = useAddProductAdminMutation();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    imageUrl: "",
  });
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // 👈 edit modal state
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  /* ================= ADD PRODUCT ================= */

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const t = toast.loading("Adding product...");

    try {
      await addProduct(newProduct).unwrap();
      toast.success("Product added successfully", { id: t });
      setShowAddProduct(false);
      setNewProduct({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
        imageUrl: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Add failed", { id: t });
    }
  };

  const { data, isLoading, isError } = useGetAllProductsAdminQuery();
  const [deleteProduct, { isLoading: isDeleting }] =
    useDeleteAnyProductMutation();
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateAnyProductMutation();

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    const t = toast.loading("Deleting...");
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted", { id: t });
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed", { id: t });
    }
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description,
    });
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const t = toast.loading("Updating product...");

    try {
      await updateProduct({
        id: editProduct._id,
        data: form,
      }).unwrap();

      toast.success("Product updated", { id: t });
      setEditProduct(null);
    } catch (err) {
      toast.error(err?.data?.message || "Update failed", { id: t });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );

  if (isError)
    return (
      <div className="bg-red-50 p-10 rounded-2xl text-center">
        <p className="text-red-600 font-bold">Failed to load products</p>
      </div>
    );

  return (
    <div className="max-w-7xl">
      {/* ================= HEADER ================= */}
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Product Moderation</h1>
          <p className="text-gray-500">
            Total {data?.products?.length || 0} products
          </p>
        </div>

        <button
          onClick={() => setShowAddProduct(!showAddProduct)}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold"
        >
          {showAddProduct ? "Close" : "+ Add Product"}
        </button>
      </header>

      {/* ================= ADD PRODUCT INFO ================= */}
      {showAddProduct && (
        <motion.form
          onSubmit={handleAddProduct}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 p-6 bg-white rounded-2xl border grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Stock"
            type="number"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="border p-3 rounded-xl"
          />

          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="border p-3 rounded-xl md:col-span-2"
          />

          <button
            type="submit"
            disabled={isAdding}
            className="md:col-span-2 py-3 bg-indigo-600 text-white rounded-xl font-bold"
          >
            Add Product
          </button>
        </motion.form>
      )}

      {/* ================= PRODUCTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {data?.products?.map((product, idx) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-5 rounded-2xl border"
          >
            <div className="h-48 rounded-xl overflow-hidden mb-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-bold">{product.name}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">
              {product.description}
            </p>

            <div className="flex justify-between text-xs text-gray-400 mt-3">
              <span>${product.price}</span>
              <span>Stock: {product.stock}</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => openEdit(product)}
                className="py-3 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-xs"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                disabled={isDeleting}
                className="py-3 rounded-xl bg-red-50 text-red-600 font-bold text-xs"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= EDIT MODAL ================= */}
      <AnimatePresence>
        {editProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.form
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onSubmit={handleUpdate}
              className="bg-white p-6 rounded-2xl w-full max-w-md space-y-4"
            >
              <h2 className="text-xl font-bold">Edit Product</h2>

              {["name", "price", "stock", "category"].map((field) => (
                <input
                  key={field}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  placeholder={field}
                  className="w-full border p-3 rounded-xl"
                />
              ))}

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Description"
                className="w-full border p-3 rounded-xl"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="flex-1 py-3 bg-gray-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;

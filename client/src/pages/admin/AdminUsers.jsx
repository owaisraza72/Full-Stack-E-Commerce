// src/pages/admin/AdminUsers.jsx

import { useState } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useAddUserAdminMutation,
  useGetAllProductsAdminQuery, // 🔹 NEW
} from "../../features/admin/adminApi";

import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Edit2,
  Trash2,
  X,
  User,
  ShoppingBag,
  Mail,
  Calendar,
  MoreVertical,
  AlertCircle,
  Eye, // 🔹 NEW
} from "lucide-react";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery();
  const { data: productsData } = useGetAllProductsAdminQuery(); // 🔹 NEW

  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [addUserAdmin] = useAddUserAdminMutation();

  // ---------------- STATES ----------------
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  // 🔹 VIEW USER MODAL
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    role: "user",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---------------- FILTER ----------------
  const filteredUsers = data?.users?.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // ---------------- ACTIONS ----------------
  const handleUpdateRole = async (id, role) => {
    try {
      await updateUserRole({ id, role }).unwrap();
      toast.success("Role updated");
      setSelectedUser(null);
      refetch();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUser._id).unwrap();
      toast.success("User deleted");
      setShowDeleteModal(false);
      setSelectedUser(null);
      refetch();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const { name, email, password, age, gender } = newUser;
    if (!name || !email || !password || !age || !gender) {
      toast.error("All fields required");
      return;
    }

    setIsSubmitting(true);

    try {
      await addUserAdmin({
        ...newUser,
        age: Number(age), // ✅ IMPORTANT
      }).unwrap();

      toast.success("User created");

      setShowAddModal(false); // ✅ MODAL CLOSE
      setNewUser({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        role: "user",
      });

      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Create failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (isError)
    return <div className="p-10 text-center text-red-500">Error</div>;

  const roleOptions = [
    { value: "user", label: "User", icon: <User size={14} /> },
    { value: "seller", label: "Seller", icon: <ShoppingBag size={14} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">User Management</h1>
        <button
          onClick={() => setShowAddModal(true)} // ✅ FIX
          className="bg-amber-500 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <UserPlus size={18} /> Add User
        </button>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-center">Role</th>
              <th className="px-6 py-3 text-center">Created</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-6 py-4">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail size={12} /> {user.email}
                  </p>
                </td>

                <td className="px-6 py-4 text-center">{user.role}</td>

                <td className="px-6 py-4 text-center">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center relative">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {selectedUser?._id === user._id && (
                    <div className="absolute right-6 mt-2 bg-white border rounded shadow z-10 w-40">
                      <button
                        onClick={() => {
                          setViewUser(user);
                          setShowViewModal(true);
                          setSelectedUser(null);
                        }}
                        className="w-full px-4 py-2 text-sm flex gap-2 hover:bg-gray-50"
                      >
                        <Eye size={14} /> View
                      </button>

                      {roleOptions.map((r) => (
                        <button
                          key={r.value}
                          onClick={() => handleUpdateRole(user._id, r.value)}
                          className="w-full px-4 py-2 text-sm hover:bg-gray-50 text-left"
                        >
                          Set as {r.label}
                        </button>
                      ))}

                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                      >
                        <Trash2 size={14} className="inline mr-1" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 VIEW USER MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form
              onSubmit={handleAddUser}
              className="bg-white p-6 rounded-xl w-full max-w-md space-y-3"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Add User</h2>
                <X
                  onClick={() => setShowAddModal(false)}
                  className="cursor-pointer"
                />
              </div>

              <input
                placeholder="Name"
                className="border p-2 rounded w-full"
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />

              <input
                placeholder="Email"
                type="email"
                className="border p-2 rounded w-full"
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />

              <input
                placeholder="Password"
                type="password"
                className="border p-2 rounded w-full"
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />

              <input
                placeholder="Age"
                type="number"
                className="border p-2 rounded w-full"
                onChange={(e) =>
                  setNewUser({ ...newUser, age: e.target.value })
                }
              />

              <select
                className="border p-2 rounded w-full"
                onChange={(e) =>
                  setNewUser({ ...newUser, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <button
                disabled={isSubmitting}
                className="w-full bg-amber-500 text-white py-2 rounded"
              >
                {isSubmitting ? "Creating..." : "Create User"}
              </button>
            </form>
          </div>
        )}
      </AnimatePresence>

      {/* 🔹 DELETE CONFIRM */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-full max-w-sm text-center">
              <AlertCircle className="mx-auto mb-3 text-red-500" />
              <p className="mb-4">Delete this user?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 border py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 text-white py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUsers;

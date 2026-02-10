import { useState } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useAddUserAdminMutation,
} from "../../features/admin/adminApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Edit2,
  Trash2,
  X,
  User,
  ShoppingBag,
  Crown,
  Mail,
  Calendar,
  MoreVertical,
  AlertCircle,
  Eye,
  Search,
  Filter,
  Shield,
  RefreshCw,
  Loader2,
  CheckCircle,
  TrendingUp,
  Users,
  BarChart3
} from "lucide-react";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [addUserAdmin] = useAddUserAdminMutation();

  // State Management
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeAction, setActiveAction] = useState(null);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    role: "user",
  });

  // Filter Users
  const filteredUsers = data?.users?.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  }) || [];

  // Role Options with Colors
  const roleOptions = [
    { 
      value: "user", 
      label: "User", 
      icon: <User size={16} />, 
      color: "bg-blue-100 text-blue-700 border-blue-200",
      badge: "bg-blue-500"
    },
    { 
      value: "seller", 
      label: "Seller", 
      icon: <ShoppingBag size={16} />, 
      color: "bg-green-100 text-green-700 border-green-200",
      badge: "bg-green-500"
    },
    { 
      value: "admin", 
      label: "Admin", 
      icon: <Crown size={16} />, 
      color: "bg-amber-100 text-amber-700 border-amber-200",
      badge: "bg-amber-500"
    },
  ];

  // Statistics
  const userStats = {
    total: data?.users?.length || 0,
    active: data?.users?.filter(u => u.status === 'active').length || 0,
    admins: data?.users?.filter(u => u.role === 'admin').length || 0,
    sellers: data?.users?.filter(u => u.role === 'seller').length || 0,
  };

  // Handle Actions
  const handleUpdateRole = async (userId, newRole) => {
    setActiveAction(`update-${userId}`);
    try {
      await updateUserRole({ id: userId, role: newRole }).unwrap();
      toast.success(`User role updated to ${newRole}`);
      setSelectedUser(null);
      refetch();
    } catch {
      toast.error("Failed to update role");
    } finally {
      setActiveAction(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setActiveAction(`delete-${selectedUser._id}`);
    try {
      await deleteUser(selectedUser._id).unwrap();
      toast.success("User deleted successfully");
      setShowDeleteModal(false);
      setSelectedUser(null);
      refetch();
    } catch {
      toast.error("Delete failed");
    } finally {
      setActiveAction(null);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Name, email, and password are required");
      return;
    }

    setIsSubmitting(true);
    try {
      await addUserAdmin({
        ...newUser,
        age: newUser.age ? Number(newUser.age) : undefined,
      }).unwrap();

      toast.success("User created successfully");
      setShowAddModal(false);
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
      toast.error(err?.data?.message || "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewUser = (user) => {
    setViewUser(user);
    setShowViewModal(true);
    setSelectedUser(null);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-3 border-gray-200 border-t-amber-500 rounded-full mb-4"
        />
        <p className="text-gray-500 font-light">Loading user database...</p>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border border-red-100 text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Unable to Load Users
        </h3>
        <p className="text-gray-600 mb-6">
          There was an error fetching user data. Please check your connection.
        </p>
        <button
          onClick={refetch}
          className="px-6 py-2.5 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
          Retry
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              User Management
            </h1>
            <p className="text-gray-500 font-light">
              Manage and monitor all user accounts ({userStats.total} total)
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            <UserPlus size={18} />
            Add New User
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Admins</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.admins}</p>
              </div>
              <Crown className="w-8 h-8 text-amber-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Sellers</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.sellers}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-transparent outline-none text-sm font-medium"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="seller">Sellers</option>
                <option value="admin">Admins</option>
              </select>
            </div>
            
            <button
              onClick={refetch}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <User className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">No users found</p>
                      {searchTerm && (
                        <p className="text-sm text-gray-400 mt-1">
                          Try adjusting your search or filter
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* User Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          <span className="font-semibold text-gray-600">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">
                            {user.name || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail size={12} />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        roleOptions.find(r => r.value === user.role)?.color || "bg-gray-100 text-gray-700"
                      }`}>
                        {roleOptions.find(r => r.value === user.role)?.icon || <User size={12} />}
                        {user.role}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          user.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className="text-sm text-gray-600 capitalize">
                          {user.status || 'active'}
                        </span>
                      </div>
                    </td>

                    {/* Created Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedUser(user._id === selectedUser?._id ? null : user)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical size={16} />
                        </motion.button>

                        <AnimatePresence>
                          {selectedUser?._id === user._id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10"
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => handleViewUser(user)}
                                  className="w-full px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                                >
                                  <Eye size={14} />
                                  View Details
                                </button>

                                <div className="h-px bg-gray-100 my-1" />
                                
                                {roleOptions.map((role) => (
                                  <button
                                    key={role.value}
                                    onClick={() => handleUpdateRole(user._id, role.value)}
                                    disabled={activeAction === `update-${user._id}`}
                                    className="w-full px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700 disabled:opacity-50"
                                  >
                                    {activeAction === `update-${user._id}` ? (
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                      role.icon
                                    )}
                                    Set as {role.label}
                                  </button>
                                ))}

                                <div className="h-px bg-gray-100 my-1" />

                                <button
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setShowDeleteModal(true);
                                  }}
                                  className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                  <Trash2 size={14} />
                                  Delete User
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
                      <p className="text-sm text-gray-500">Create a new user account</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleAddUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        value={newUser.age}
                        onChange={(e) => setNewUser({...newUser, age: e.target.value})}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none"
                        placeholder="25"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        value={newUser.gender}
                        onChange={(e) => setNewUser({...newUser, gender: e.target.value})}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <div className="flex gap-2">
                      {roleOptions.map((role) => (
                        <button
                          type="button"
                          key={role.value}
                          onClick={() => setNewUser({...newUser, role: role.value})}
                          className={`flex-1 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                            newUser.role === role.value
                              ? `${role.color.replace('bg-', 'border-')} border-2`
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {role.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                      ) : (
                        "Create User"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View User Modal */}
      <AnimatePresence>
        {showViewModal && viewUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-white">
                        {viewUser.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">{viewUser.name}</h3>
                      <p className="text-sm text-gray-500">{viewUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium text-gray-900 capitalize">{viewUser.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="font-medium text-gray-900">
                        {new Date(viewUser.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {viewUser.age && (
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium text-gray-900">{viewUser.age}</p>
                    </div>
                  )}
                  
                  {viewUser.gender && (
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium text-gray-900 capitalize">{viewUser.gender}</p>
                    </div>
                  )}

                  {viewUser.about && (
                    <div>
                      <p className="text-sm text-gray-500">About</p>
                      <p className="text-gray-700 mt-1">{viewUser.about}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowViewModal(false)}
                  className="w-full mt-6 px-4 py-2.5 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg font-medium hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  Delete User
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete <span className="font-semibold">{selectedUser.name}</span>? 
                  This action cannot be undone.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={activeAction === `delete-${selectedUser._id}`}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50"
                  >
                    {activeAction === `delete-${selectedUser._id}` ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Delete User"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUsers;
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Shield,
  Calendar,
  MapPin,
  Edit2,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  return (
    <div className="bg-[#fcfcfd] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-indigo-500/5 border border-gray-100 mb-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black shadow-xl shadow-indigo-500/20">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <h1 className="text-4xl font-black text-gray-900 font-heading capitalize">
                {user.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-indigo-100 flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  {user.role} Member
                </span>
                <span className="px-4 py-1.5 bg-pink-50 text-pink-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-pink-100 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <button className="btn btn-primary !rounded-2xl !py-3 flex items-center gap-2 shadow-lg shadow-indigo-500/20">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Quick Stats/Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to="/orders"
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
          >
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Package className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">My Orders</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              View your purchase history, track active shipments, and manage
              returns.
            </p>
          </Link>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
            <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-7 h-7 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Saved Addresses
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Manage your shipping and billing addresses for a faster checkout
              experience.
            </p>
          </div>
        </div>

        {/* Account Details Table */}
        <div className="mt-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-10 py-8 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest font-heading">
              Account Information
            </h2>
          </div>
          <div className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-1">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email Address
                </p>
                <p className="text-gray-900 font-bold">{user.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <User className="w-3 h-3" /> Age & Gender
                </p>
                <p className="text-gray-900 font-bold capitalize">
                  {user.gender}, {user.age} Years
                </p>
              </div>
              <div className="md:col-span-2 space-y-1">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">
                  About Me
                </p>
                <p className="text-gray-500 italic leading-relaxed text-sm">
                  "{user.about}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

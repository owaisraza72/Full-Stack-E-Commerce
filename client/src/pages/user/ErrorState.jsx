import { MdSecurity } from "react-icons/md";

export const ErrorState = () => (
  <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50">
    <div className="text-center max-w-md">
      <div className="relative mb-6">
        <div className="w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full mx-auto flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-transparent rounded-full bg-gradient-to-r from-rose-500 to-pink-500 p-1 animate-pulse">
            <div className="w-full h-full bg-white rounded-full"></div>
          </div>
          <MdSecurity className="text-4xl text-rose-600 relative z-10" />
        </div>
      </div>
      <h2 className="text-3xl font-light text-gray-800 mb-3 tracking-tight">
        Collection Unavailable
      </h2>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Our luxury curation service is currently undergoing maintenance.
        Please return shortly for an enhanced shopping experience.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white font-light tracking-widest rounded-full hover:shadow-2xl transition-all duration-300 overflow-hidden"
      >
        <span className="relative z-10">REFRESH EXPERIENCE</span>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>
  </div>
);
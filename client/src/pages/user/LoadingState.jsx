import { FaGem } from "react-icons/fa";

export const LoadingState = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white">
    <div className="relative mb-8">
      <div className="w-24 h-24 border-4 border-transparent rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 p-1 animate-spin">
        <div className="w-full h-full bg-white rounded-full"></div>
      </div>
      <FaGem className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-amber-600" />
    </div>
    <p className="text-lg font-light text-gray-600 tracking-widest animate-pulse">
      CURATING LUXURY COLLECTION
    </p>
    <div className="mt-8 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
    </div>
  </div>
);
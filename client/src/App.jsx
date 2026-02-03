import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useGetProfileQuery } from "./features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "./features/auth/authSlice";
import { useEffect } from "react";

const App = () => {
  const { data, isSuccess } = useGetProfileQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen">
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
};

export default App;

import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useGetProfileQuery } from "./features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser, finishCheckingAuth } from "./features/auth/authSlice";
import { useEffect } from "react";
import {LoadingState} from "./pages/user/LoadingState";

const App = () => {
  const { data, isLoading, isError, isSuccess } = useGetProfileQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    } else if (isError || (!isLoading && !data)) {
      dispatch(finishCheckingAuth());
    }
  }, [isSuccess, isError, isLoading, data, dispatch]);

  if (isLoading) return <LoadingState />;

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

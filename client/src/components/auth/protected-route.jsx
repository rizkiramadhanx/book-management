import { Navigate } from "react-router-dom";
import Sidebar from "../layout/sidebar";

const ProtectedRoute = ({ element }) => {
  let isAuthenticated = false;

  if (typeof window !== "undefined") {
    isAuthenticated = localStorage.getItem("token") ? true : false;
  }

  if (!isAuthenticated) {
    // Jika tidak terautentikasi, alihkan ke halaman login
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Sidebar>{element}</Sidebar>
    </>
  ); // Jika terautentikasi, render komponen yang diinginkan
};

export default ProtectedRoute;

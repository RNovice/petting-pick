import { createHashRouter, createBrowserRouter } from "react-router-dom";
import AuthWrapper from "./components/auth/AuthWrapper";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProductManagement from "./pages/ProductManagement";
import ProductDetail from "./components/product/ProductDetail";
import OrderManagement from "./pages/OrderManagement";
import CouponManagement from "./pages/CouponManagement";

const createRouter =
  process.env.NODE_ENV === "production"
    ? createHashRouter
    : createBrowserRouter;

export default createRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthWrapper>
        <Login />
      </AuthWrapper>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <div className="d-flex flex-column align-items-center my-5">
            <h1>Welcome to The Back Office</h1>
            <p className="fs-4">Select Manage Option from the navigation bar</p>
          </div>
        ),
      },
      { path: "products", element: <ProductManagement /> },
      { path: "orders", element: <OrderManagement /> },
      { path: "coupons", element: <CouponManagement /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

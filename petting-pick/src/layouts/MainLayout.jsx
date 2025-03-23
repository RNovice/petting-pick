import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../slice/productSlice";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import { getCart } from "../slice/cartSlice";
import api from "../services/api";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "PRODUCTS", path: "/products" },
  { name: "SHOPPING CART", path: "/cart" },
];

const MainLayout = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.status);

  const navItemsWithAuth = [
    ...navItems,
    loginStatus === "logged-in"
      ? { name: "BACK OFFICE", path: "/admin" }
      : { name: "LOGIN", path: "/login" },
  ];
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { products, pagination },
        } = await api("products");
        dispatch(updateProduct({ data: products, pagination }));
      } catch (err) {
        const axiosError = err.response?.data?.message;
        console.error("Get Product Failed", axiosError || err);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div>
      <NavBar navItems={navItemsWithAuth} />
      <main style={{ minHeight: "calc(100vh - 0.5rem*2 - 1px*2)" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

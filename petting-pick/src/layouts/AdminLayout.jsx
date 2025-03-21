import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "@/slice/authSlice";
import NavBar from "../components/common/NavBar";

const navItems = [
  { name: "MANAGE PRODUCTS", path: "/admin/products" },
  { name: "MANAGE ORDERS", path: "/admin/orders" },
  { name: "MANAGE COUPONS", path: "/admin/coupons" },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await dispatch(logoutAdmin()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div>
      <NavBar navItems={navItems} />
      <button
        className="btn btn-danger position-fixed top-0 end-0 m-3 py-1 px-2 z-1"
        onClick={handleLogout}
      >
        Logout
      </button>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

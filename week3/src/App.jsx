import { useState, useEffect } from "react";
import axios from "axios";
import ProductEditor from "./components/ProductEditor";
import Login from "./components/Login";

const env = import.meta.env;
const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = env;

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [viewProduct, setViewProduct] = useState(null);

  useEffect(() => {
    async function checkLogin() {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];
        if (token === undefined) return;
        axios.defaults.headers.common.Authorization = token;
        const {
          data: { success },
        } = await axios.post(`${API_BASE}/api/user/check`);
        setIsLogin(success);
        if (success) getProducts();
      } catch (err) {
        console.error(err);
      }
    }
    checkLogin();
  }, []);

  async function getProducts() {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products`);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {isLogin ? (
        // <div className="container">
        //   <button className="btn btn-danger mt-4" onClick={handleLogout}>
        //     {" "}
        //     Logout{" "}
        //   </button>
        //   <div className="row mt-3">
        //     Edit products
        //   </div>
        // </div>
        <ProductEditor setIsLogin={setIsLogin} products={products} />
      ) : (
        <Login setIsLogin={setIsLogin} getProducts={getProducts} />
      )}
    </>
  );
}

export default App;

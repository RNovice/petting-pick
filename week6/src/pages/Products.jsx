import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/slice/loadingSlice";
import { updateProduct } from "@/slice/productSlice";
import Paginator from "../components/common/Paginator";
import AsideCart from "../components/product/AsideCart";
import { useNavigate } from "react-router-dom";

const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = import.meta.env;

const Products = () => {
  const products = useSelector((state) => state.products?.data);
  const { total_pages: totalPages, current_page: currentPage } = useSelector(
    (state) => state.products?.pagination
  );
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [notifications, setNotifications] = useState({
    msg: null,
    type: "",
    key: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getCart();
  }, []);

  async function handleAddToCart(id) {
    try {
      dispatch(startLoading());
      await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data: { product_id: id, qty: 1 },
      });
      await getCart();
      const key = Date.now();
      setNotifications({ msg: "Item Added", type: "success", key });
    } catch (err) {
      const axiosError = err.response?.data?.message;
      console.error("Get Product Failed", axiosError || err);
    } finally {
      dispatch(stopLoading());
    }
  }

  function handleViewDetails(product) {
    navigate(`/products/${product.id}`, { state: product });
  }

  const getProducts = async (page = null) => {
    try {
      const {
        data: { products, pagination },
      } = await axios(
        `${API_BASE}/api/${API_PATH}/products${page ? `?page=${page}` : ""}`
      );
      dispatch(updateProduct({ data: products, pagination }));
    } catch (err) {
      const axiosError = err.response?.data?.message;
      console.error("Get Product Failed", axiosError || err);
    }
  };

  const onPageChange = (page) => {
    getProducts(page);
  };

  const getCart = async () => {
    try {
      const {
        data: {
          data: { carts, final_total },
        },
      } = await axios(`${API_BASE}/api/${API_PATH}/cart`);
      setCart(carts);
      setCartTotal(final_total);
    } catch (err) {
      const axiosError = err.response?.data?.message;
      console.error("Get Cart Failed", axiosError || err);
    }
  };

  return (
    <div className="container my-4">
      <AsideCart
        cart={cart}
        cartTotal={cartTotal}
        notifications={notifications}
        getCart={getCart}
      />
      <div className="row mb-5">
        <h2>Products</h2>
        {products.map((product) => (
          <div className="col-md-4 mb-3" key={`shop-product-${product.id}`}>
            <div className="card h-100">
              <div className="ratio ratio-4x3">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.title}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <small>
                  <s>${product.origin_price}</s>
                </small>
                <p className="card-text">${product.price}</p>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleViewDetails(product)}
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        ))}
        {totalPages > 1 && (
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Products;

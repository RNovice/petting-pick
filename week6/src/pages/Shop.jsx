import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReactLoading from "react-loading";
import ProductDetailModal from "../components/shop/ProductDetailModal";
import Paginator from "../components/common/Paginator";
import AsideCart from "../components/shop/AsideCart";

const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = import.meta.env;

const Shop = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [viewProduct, setViewProduct] = useState({});
  const [notifications, setNotifications] = useState({
    msg: null,
    type: "",
    key: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAsideCartLoading, setIsAsideCartLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  async function handleAddToCart(id) {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  }

  function handleShowDetails(product) {
    setViewProduct(product);
    modalRef.current?.showModal();
  }

  async function handleCartItemUpdate(product_id, qty, isAsideCart = false) {
    const setLoading = isAsideCart ? setIsAsideCartLoading : setIsLoading;
    try {
      setLoading(true);
      const url = `${API_BASE}/api/${API_PATH}/cart/${product_id}`;
      qty > 0
        ? await axios.put(url, { data: { product_id, qty } })
        : await axios.delete(url);
      await getCart();
    } catch (err) {
      const axiosError = err.response?.data?.message;
      console.error("Get Product Failed", axiosError || err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveFromCart(id = null, isAsideCart = false) {
    const setLoading = isAsideCart ? setIsAsideCartLoading : setIsLoading;
    try {
      setLoading(true)
      await axios.delete(
        `${API_BASE}/api/${API_PATH}/cart${id === null ? "s" : `/${id}`}`
      );
      await getCart();
    } catch (err) {
      const axiosError = err.response?.data?.message;
      console.error("Get Product Failed", axiosError || err);
    } finally {
      setLoading(false)
    }
  }

  const getProducts = async (page = null) => {
    try {
      const {
        data: { products, pagination },
      } = await axios(
        `${API_BASE}/api/${API_PATH}/products${page ? `?page=${page}` : ""}`
      );
      setCurrentPage(pagination.current_page);
      setTotalPages(pagination.total_pages);
      setProducts(products);
    } catch (err) {
      const axiosError = err.response?.data?.message;
      console.error("Get Product Failed", axiosError || err);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
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

  const submitOrder = async (user) => {
    try {
      setIsLoading(true);
      if (cart.length === 0)
        return setNotifications({
          msg: "Shopping Cart is Empty",
          type: "warning",
          key: Date.now(),
        });
      const message = user.message;
      await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
        data: { user, message },
      });
      reset();
      await getCart();
      alert("Order successfully");
    } catch (err) {
      const axiosError = err.response?.data?.message;
      console.error("Get Product Failed", axiosError || err);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="container my-4">
      <AsideCart
        cart={cart}
        cartTotal={cartTotal}
        handleCartItemUpdate={handleCartItemUpdate}
        handleRemoveFromCart={handleRemoveFromCart}
        notifications={notifications}
        isAsideCartLoading={isAsideCartLoading}
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
                  onClick={() => handleShowDetails(product)}
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
      <ProductDetailModal ref={modalRef} modalData={viewProduct} />
      <div className="mb-5">
        <h2 className="d-flex">
          Cart
          <button
            className="btn btn-outline-danger ms-auto"
            onClick={() => handleRemoveFromCart()}
          >
            Clear Cart
          </button>
        </h2>
        {cart.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={`cart-item-${item.id}`}>
                  <td>{item.product?.title}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.qty}
                      onChange={(e) =>
                        handleCartItemUpdate(item.id, +e.target.value)
                      }
                    />
                  </td>
                  <td>${item.final_total}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="fs-5">No items in the cart.</p>
        )}
        <h4>Total: ${cartTotal}</h4>
      </div>
      <div className="mb-5">
        <h2>Customer Information</h2>
        <form onSubmit={handleSubmit(submitOrder)}>
          <div className="mb-3">
            <label className="form-label required-field">Name</label>
            <input
              type="text"
              className="form-control"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label required-field">Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label required-field">Phone</label>
            <input
              type="tel"
              className="form-control"
              {...register("tel", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors.tel && <p className="text-danger">{errors.tel.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label required-field">Address</label>
            <textarea
              className="form-control"
              rows="3"
              {...register("address", { required: "Address is required" })}
            ></textarea>
            {errors.address && (
              <p className="text-danger">{errors.address.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows="3"
              {...register("message")}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center position-fixed"
          style={{
            inset: 0,
            backgroundColor: "#4444",
            zIndex: 100,
          }}
        >
          <ReactLoading
            type="spinningBubbles"
            color="#fff"
            width="5rem"
            height="5rem"
          />
        </div>
      )}
    </div>
  );
};

export default Shop;

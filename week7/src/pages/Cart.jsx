import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/slice/loadingSlice";
import { getCart, updateCartItem, removeCartItem } from "@/slice/cartSlice";
import axios from "axios";

const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = import.meta.env;

const Cart = () => {
  const { cart, cartTotal } = useSelector((state) => state.cart);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  async function handleCartItemUpdate(product_id, qty) {
    try {
      dispatch(startLoading());
      await dispatch(updateCartItem({ product_id, qty }));
    } finally {
      dispatch(stopLoading());
    }
  }

  async function handleRemoveFromCart(id = null) {
    try {
      dispatch(startLoading());
      await dispatch(removeCartItem(id));
    } finally {
      dispatch(stopLoading());
    }
  }

  const submitOrder = async (user) => {
    try {
      dispatch(startLoading());
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
      await dispatch(getCart());
      alert("Order successfully");
    } catch (err) {
      const axiosError = err.response?.data?.message;
      console.error("Get Product Failed", axiosError || err);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="container my-4">
      <div className="mb-5">
        <h2 className="d-flex">
          Cart
          {cart.length > 0 && (
            <button
              className="btn btn-outline-danger ms-auto"
              onClick={() => handleRemoveFromCart()}
              disabled={cart.length === 0}
            >
              Clear Cart
            </button>
          )}
        </h2>
        {cart.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr className="align-middle" key={`cart-item-${item.id}`}>
                  <td className="p-1">
                    <div className="ratio ratio-16x9 m-auto">
                      <img
                        src={item?.product.imageUrl}
                        className="card-img-top rounded"
                        alt={item?.product.title}
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </div>
                  </td>
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
          <p className="fs-5 text-danger">No items in the cart.</p>
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
          <button
            type="submit"
            className="btn btn-success"
            disabled={cart.length === 0}
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;

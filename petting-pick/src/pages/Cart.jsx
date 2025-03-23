import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "@/slice/notificationSlice";
import { startLoading, stopLoading } from "@/slice/loadingSlice";
import { getCart, updateCartItem, removeCartItem } from "@/slice/cartSlice";
import trashCanSvg from "@/assets/images/trash-can.svg";
import { Link } from "react-router-dom";
import OrderResult from "../components/order/OrderResult";
import api from "../services/api";

const Cart = () => {
  const { cart, cartTotal, cartOrigin } = useSelector((state) => state.cart);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");
  const [result, setResult] = useState({});

  useEffect(() => {
    const handleWheel = (event) => {
      if (document.activeElement.type === "number") {
        event.preventDefault();
        event.target.blur();
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

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

  async function handleApplyCoupon() {
    const msg = { type: "success", msg: "Coupon applied" };
    try {
      dispatch(startLoading());
      await api.post("coupon", {
        data: { code: coupon },
      });
      await dispatch(getCart());
    } catch (err) {
      const errMsg = err?.response?.data?.message || "";
      msg.type = "fail";
      msg.msg = errMsg.includes("無法")
        ? "Coupon expired or disabled"
        : "Coupon not found";
    } finally {
      dispatch(stopLoading());
      dispatch(notify(msg));
    }
  }

  async function handleRemoveCoupon() {
    if (!confirm("Are you sure you want to cancel the discount")) return;
    try {
      dispatch(startLoading());
      await api.post("coupon", {
        data: { code: "remove" },
      });
      await dispatch(getCart());
    } finally {
      dispatch(stopLoading());
    }
  }

  const submitOrder = async (user) => {
    try {
      dispatch(startLoading());
      if (cart.length === 0) {
        dispatch(notify({ type: "fail", msg: "Shopping Cart is Empty" }));
        return;
      }
      const message = user.message;
      const { data } = await api.post("order", {
        data: { user, message },
      });
      reset();
      await dispatch(getCart());
      setResult(data);
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
          <div className="table-responsive">
            <table className="table table-sm table-bordered">
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
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
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
          </div>
        ) : (
          <div className="mb-3 fs-5 d-flex gap-2">
            <span className="text-danger">No items in the cart.</span>
            <Link className="text-primary" to="/products">
              Get Some Goods
            </Link>
          </div>
        )}
        <h4>Total: ${cartTotal}</h4>
      </div>
      <div className="mb-5">
        <h2>Coupon</h2>
        <div className="mb-3 d-flex gap-3">
          <input
            type="text"
            className="form-control"
            value={coupon}
            onChange={({ target }) => setCoupon(target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            disabled={!coupon}
            onClick={handleApplyCoupon}
          >
            APPLY
          </button>
        </div>
        {cartOrigin !== cartTotal && (
          <div className="mb-3 d-flex gap-2">
            Coupon Applying ${cartOrigin} become ${cartTotal}
            <i
              className="icon bg-danger"
              title="remove coupon"
              onClick={handleRemoveCoupon}
              style={{
                maskImage: `url("${trashCanSvg}")`,
                width: 20,
                height: 20,
                cursor: "pointer",
              }}
            />
          </div>
        )}
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
      <OrderResult result={result} />
    </div>
  );
};

export default Cart;

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import shoppingCartSvg from "@/assets/shopping-cart.svg";
import trashCanSvg from "@/assets/trash-can.svg";

const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = import.meta.env;

const AsideCart = ({ cart, cartTotal, notifications, getCart }) => {
  const [isAsideCartLoading, setIsAsideCartLoading] = useState(false);
  const navigate = useNavigate();
  const cartRef = useRef(null);

  async function handleCartItemUpdate(product_id, qty) {
    try {
      setIsAsideCartLoading(true);
      const url = `${API_BASE}/api/${API_PATH}/cart/${product_id}`;
      qty > 0
        ? await axios.put(url, { data: { product_id, qty } })
        : await axios.delete(url);
      await getCart();
    } catch (err) {
      const axiosError = err.response?.data?.message;
      console.error("Get Product Failed", axiosError || err);
    } finally {
      setIsAsideCartLoading(false);
    }
  }

  async function handleRemoveFromCart(id = null) {
    try {
      setIsAsideCartLoading(true);
      await axios.delete(
        `${API_BASE}/api/${API_PATH}/cart${id === null ? "s" : `/${id}`}`
      );
      await getCart();
    } catch (err) {
      const axiosError = err.response?.data?.message;
      console.error("Get Product Failed", axiosError || err);
    } finally {
      setIsAsideCartLoading(false);
    }
  }

  return (
    <>
      <button
        className="btn position-fixed top-0 end-0 m-3 p-0 z-1"
        onClick={() => cartRef.current?.showModal()}
        type="button"
      >
        <i
          className="icon bg-primary"
          style={{
            maskImage: `url("${shoppingCartSvg}")`,
            width: "2rem",
            height: "2rem",
          }}
        />
        {cart.length > 0 && (
          <span
            className="badge bg-primary border rounded-circle d-flex justify-content-center align-items-center position-absolute"
            style={{
              top: "-5px",
              right: "45%",
              transform: "translateX(50%)",
              fontSize: "0.6rem",
              width: "1.25rem",
              height: "1.25rem",
            }}
          >
            {cart.length > 99 ? "99+" : cart.length}
          </span>
        )}
        <div className="cart-notify-container">
          {notifications.msg && (
            <div
              key={`notify-${notifications.key}`}
              className={`btn btn-${notifications.type} border cart-notify`}
            >
              {notifications.msg}
            </div>
          )}
        </div>
      </button>
      <dialog ref={cartRef} className="p-3 bg-body aside-cart" tabIndex={0}>
        <button
          type="button"
          className="btn-close"
          onClick={() => cartRef.current?.close()}
          style={{ float: "right" }}
        />
        <h2>Cart</h2>
        {cart.length > 0 ? (
          <table className="table ">
            <tbody style={{ verticalAlign: "middle" }}>
              {cart.map((item) => (
                <tr key={`cart-item-${item.id}`}>
                  <td>{item.product?.title}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      style={{ width: "5rem" }}
                      value={item.qty}
                      onChange={(e) =>
                        handleCartItemUpdate(item.id, +e.target.value)
                      }
                    />
                  </td>
                  <td>${item.final_total}</td>
                  <td>
                    <i
                      className="icon bg-danger m-auto"
                      style={{
                        maskImage: `url("${trashCanSvg}")`,
                        width: "1.5rem",
                        height: "1.5rem",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemoveFromCart(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="fs-5">No items in the cart.</p>
        )}
        <h4 className="d-flex gap-3 align-items-center">
          Total: ${cartTotal}
          <div className="ms-auto">
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => navigate("/cart")}
            >
              Checkout
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleRemoveFromCart(null)}
            >
              Clear Cart
            </button>
          </div>
        </h4>

        {isAsideCartLoading && (
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
              width="4rem"
              height="4rem"
            />
          </div>
        )}
      </dialog>
    </>
  );
};

export default AsideCart;

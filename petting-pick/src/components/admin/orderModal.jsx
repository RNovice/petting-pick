import { forwardRef, useRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { notify } from "@/slice/notificationSlice";
import api from "../../services/api";

const OrderModal = forwardRef(({ modalData, setModalData, getOrders }, ref) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    showModal: () => modalRef.current?.showModal(),
    close: () => modalRef.current?.close(),
  }));

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;

    let updatedValue;

    if (type === "checkbox") {
      updatedValue = checked;
    } else if (type === "number") {
      updatedValue = +value
        .replace(/[^0-9.]|(?<=\..*)\./g, "")
        .replace(/^\./, "");
    } else {
      updatedValue = value;
    }

    setModalData((prev) => {
      if (name.includes("user")) {
        return {
          ...prev,
          user: { ...prev.user, [name.split(".")[1]]: updatedValue },
        };
      } else if (name.includes("products")) {
        const key = name.split(".")[1];
        return {
          ...prev,
          products: {
            ...prev.products,
            [key]: { ...prev.products[key], qty: updatedValue },
          },
        };
      } else {
        return { ...prev, [name]: updatedValue };
      }
    });
  }

  async function handleSaveOrder(id) {
    const msg = {
      type: "success",
      msg: `Order updated`,
    };
    try {
      await api.put(`admin/order/${id}`, {
        data: modalData,
      });
      getOrders();
      modalRef.current?.close();
    } catch (err) {
      msg.type = "fail";
      const axiosError = err.response?.data.message;
      const errorMsg = "Order update failed";
      console.error(errorMsg, axiosError || err);
      msg.msg = errorMsg;
    } finally {
      dispatch(notify(msg));
    }
  }

  return (
    <dialog className="modal-env" ref={modalRef}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content" style={{ maxHeight: "85vh" }}>
          <div className="modal-header">
            <h5 className="modal-title">Edit Order</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => modalRef.current?.close()}
            ></button>
          </div>

          <div className="modal-body overflow-auto">
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="edit-order-name" className="required-field">
                    Customer Name
                  </label>
                  <input
                    id="edit-order-name"
                    type="text"
                    className="form-control"
                    name="user.name"
                    value={modalData.user.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-order-email" className="required-field">
                    Email
                  </label>
                  <input
                    id="edit-order-email"
                    type="email"
                    className="form-control"
                    name="user.email"
                    value={modalData.user.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-order-phone" className="required-field">
                    Phone
                  </label>
                  <input
                    id="edit-order-phone"
                    type="tel"
                    className="form-control"
                    name="user.tel"
                    value={modalData.user.tel}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="edit-order-address"
                    className="required-field"
                  >
                    Address
                  </label>
                  <input
                    id="edit-order-address"
                    type="text"
                    className="form-control"
                    name="user.address"
                    value={modalData.user.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label
                    htmlFor="edit-order-create-at"
                    className="required-field"
                  >
                    Created At
                  </label>
                  <input
                    id="edit-order-create-at"
                    type="text"
                    className="form-control"
                    name="create_at"
                    value={new Date(
                      modalData.create_at * 1000
                    ).toLocaleString()}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-order-message">Message</label>
                  <textarea
                    id="edit-order-message"
                    className="form-control"
                    name="message"
                    rows="2"
                    value={modalData.message}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="modal-input-is_paid"
                    name="is_paid"
                    checked={modalData.is_paid}
                    onChange={handleInputChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="modal-input-is_paid"
                  >
                    Payment Completed
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h6>Ordered Products</h6>
              {Object.entries(modalData.products).map(([key, product], i) => (
                <div
                  key={`edit-order-product-${i}`}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <span>Product: {product.product?.title || product.id}</span>
                  <div className="d-flex align-items-center">
                    <label htmlFor={`edit-order-qty-${i}`} className="me-2">
                      Quantity:
                    </label>
                    <input
                      id={`edit-order-qty-${i}`}
                      type="number"
                      min={0}
                      className="form-control"
                      name={`products.${key}.qty`}
                      value={product.qty}
                      onChange={handleInputChange}
                      style={{ width: "120px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => modalRef.current?.close()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSaveOrder(modalData.id)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
});

OrderModal.displayName = "OrderModal";

export default OrderModal;

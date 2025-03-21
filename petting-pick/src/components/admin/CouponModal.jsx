import { forwardRef, useRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { notify } from "@/slice/notificationSlice";

const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = import.meta.env;

const CouponModal = forwardRef(
  ({ modalData, setModalData, isEditMode, getCoupons }, ref) => {
    const modalRef = useRef(null);
    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
      showModal: () => modalRef.current?.showModal(),
      close: () => modalRef.current?.close(),
    }));

    function handleInputChange(e) {
      const { name, value, type, checked } = e.target;

      const updatedValue =
        type === "checkbox"
          ? +checked
          : name === "percent"
          ? Math.min(+value.replace(/\D/g, ""), 100)
          : value;

      setModalData({ ...modalData, [name]: updatedValue });
    }

    async function handleSaveCoupon(id = null) {
      const url = `${API_BASE}/api/${API_PATH}/admin/coupon/${id ? id : ""}`;

      const couponData = {
        data: {
          ...modalData,
          due_date: new Date(modalData.due_date).getTime() / 1000,
          percent: +modalData.percent,
        },
      };
      const msg = {
        type: "success",
        msg: `Coupon ${id ? "updated" : "added"}`,
      };
      try {
        id
          ? await axios.put(url, couponData)
          : await axios.post(url, couponData);

        getCoupons();
        modalRef.current?.close();
      } catch (err) {
        msg.type = "fail";
        const axiosError = err.response?.data.message;
        const errorMsg = `Coupon ${id ? "update" : "add"} failed`;
        console.error(errorMsg, axiosError || err);
        msg.msg = errorMsg;
      } finally {
        dispatch(notify(msg));
      }
    }

    return (
      <dialog className="modal-env" ref={modalRef}>
        <div className="modal-dialog modal-xl">
          <form
            className="modal-content"
            style={{ maxHeight: "85vh" }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveCoupon(modalData.id ? modalData.id : null);
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditMode ? "Edit Coupon" : "Add New Coupon"}
              </h5>
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
                    <label
                      className="required-field"
                      htmlFor="modal-input-title"
                    >
                      Title
                    </label>
                    <input
                      id="modal-input-title"
                      type="text"
                      className="form-control"
                      name="title"
                      required
                      value={modalData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      className="required-field"
                      htmlFor="modal-input-due_date"
                    >
                      Due Date
                    </label>
                    <input
                      id="modal-input-due_date"
                      type="date"
                      className="form-control"
                      name="due_date"
                      required
                      value={modalData.due_date.replaceAll("/", "-")}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      className="required-field"
                      htmlFor="modal-input-code"
                    >
                      Code
                    </label>
                    <input
                      id="modal-input-code"
                      type="text"
                      className="form-control"
                      name="code"
                      required
                      value={modalData.code}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      className="required-field"
                      htmlFor="modal-input-percent"
                    >
                      Percent
                    </label>
                    <input
                      id="modal-input-percent"
                      type="text"
                      className="form-control"
                      name="percent"
                      required
                      value={modalData.percent}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="modal-input-is_enabled"
                      name="is_enabled"
                      checked={modalData.is_enabled}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="modal-input-is_enabled"
                    >
                      Is Enabled
                    </label>
                  </div>
                </div>
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
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    );
  }
);

CouponModal.displayName = "CouponModal"

export default CouponModal;

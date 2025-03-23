import { useState, useEffect, useRef } from "react";
import Paginator from "@/components/common/Paginator";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/slice/loadingSlice";
import { notify } from "@/slice/notificationSlice";
import CouponModal from "../components/admin/CouponModal";
import api from "../services/api";

const emptyModalData = () => ({
  title: "",
  is_enabled: 0,
  percent: 100,
  due_date: "",
  code: "",
});

const countdown = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = Math.floor((target - now) / (1000 * 60 * 60 * 24));

  if (diff > 0) return `${diff} Days`;
  if (diff === 0) return "Today";
  return "Expired";
};

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [modalData, setModalData] = useState(emptyModalData());
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleModalOperation(isEditMethod, coupon = emptyModalData()) {
    setIsEditMode(isEditMethod);
    setModalData({
      ...emptyModalData(),
      ...coupon,
      is_enabled: coupon.is_enabled ?? 0,
    });
    modalRef.current?.showModal();
  }

  async function handleDeleteCoupon(id) {
    const msg = { type: "success", msg: "Coupon deleted" };
    try {
      if (!confirm("Are you sure you want to delete this coupon")) {
        msg.type = "info";
        msg.msg = "Action cancelled";
        return;
      }
      await api.delete(`admin/coupon/${id}`);
      getCoupons();
    } catch (err) {
      console.error("Delete Failed", err);
      msg.type = "fail";
      msg.msg = "Coupon delete failed";
    } finally {
      dispatch(notify(msg));
    }
  }

  async function getCoupons(page = null) {
    try {
      dispatch(startLoading());
      const {
        data: { coupons, pagination },
      } = await api.get(`admin/coupons${page ? `?page=${page}` : ""}`);
      setCurrentPage(pagination.current_page);
      setTotalPages(pagination.total_pages);
      setCoupons(
        coupons.map((coupon) => ({
          ...coupon,
          due_date: new Date(coupon.due_date * 1000)
            .toISOString()
            .split("T")[0],
        }))
      );
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(stopLoading());
    }
  }

  function onPageChange(page) {
    setCurrentPage(page);
    getCoupons(page);
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-primary"
          onClick={() => handleModalOperation(false)}
        >
          Add New Coupon
        </button>
      </div>
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date (Left Days)</th>
            <th>Code</th>
            <th>Percent</th>
            <th>Is Enabled</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={index}>
              <td>{coupon.title}</td>
              <td>
                {coupon.due_date} ({countdown(coupon.due_date)})
              </td>
              <td>{coupon.code}</td>
              <td>{coupon.percent}</td>
              <td>{coupon.is_enabled ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleModalOperation(true, coupon)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCoupon(coupon.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
      <CouponModal
        ref={modalRef}
        modalData={modalData}
        setModalData={setModalData}
        isEditMode={isEditMode}
        getCoupons={getCoupons}
      />
    </div>
  );
};

export default CouponManagement;

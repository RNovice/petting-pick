import { useState, useEffect, useRef } from "react";
import OrderModal from "@/components/admin/OrderModal";
import Paginator from "@/components/common/Paginator";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/slice/loadingSlice";
import { notify } from "@/slice/notificationSlice";
import api from "../services/api";

const emptyModalData = () => ({
  create_at: 0,
  is_paid: false,
  message: "",
  products: {},
  user: {
    address: "",
    email: "",
    name: "",
    tel: "",
  },
});

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [modalData, setModalData] = useState(emptyModalData());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleModalOperation(order = emptyModalData()) {
    setModalData({
      ...emptyModalData(),
      ...order,
    });
    modalRef.current?.showModal();
  }

  async function handleDeleteOrder(id = null) {
    const msg = { type: "success", msg: "Order deleted" };
    try {
      if (
        !confirm(
          `Are you sure you want to delete ${id ? "this order" : "all orders"}?`
        )
      ) {
        msg.type = "info";
        msg.msg = "Action cancelled";
        return;
      }
      await api.delete(`admin/order${id ? `/${id}` : `s/all`}`);
      getOrders();
    } catch (err) {
      console.error("Delete Failed", err);
      msg.type = "fail";
      msg.msg = "Order delete failed";
    } finally {
      dispatch(notify(msg));
    }
  }

  async function getOrders(page = null) {
    try {
      dispatch(startLoading());
      const {
        data: { orders, pagination },
      } = await api.get(`admin/orders${page ? `?page=${page}` : ""}`);
      setCurrentPage(pagination.current_page);
      setTotalPages(pagination.total_pages);
      setOrders(orders);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(stopLoading());
    }
  }

  function onPageChange(page) {
    setCurrentPage(page);
    getOrders(page);
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-primary" onClick={() => handleDeleteOrder()}>
          Delete All Orders
        </button>
      </div>
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Is Paid</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={index}>
              <td>{order.user.name}</td>
              <td>{order.user.email}</td>
              <td>{order.user.tel}</td>
              <td>{order.user.address}</td>
              <td>{order.is_paid ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleModalOperation(order)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteOrder(order.id)}
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
      <OrderModal
        ref={modalRef}
        modalData={modalData}
        setModalData={setModalData}
        getOrders={getOrders}
      />
    </div>
  );
};

export default OrderManagement;

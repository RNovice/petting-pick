import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductModal from "@/components/admin/ProductModal";
import Paginator from "@/components/common/Paginator";

const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = import.meta.env;

const emptyModalData = () => ({
  imageUrl: "",
  imagesUrl: [],
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  id: "",
  rating: "",
});

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [modalData, setModalData] = useState(emptyModalData());
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const modalRef = useRef(null);

  useEffect(() => {
    getOrders();
  }, []);

  function handleModalOperation(isEditMethod, product = emptyModalData()) {
    setIsEditMode(isEditMethod);
    setModalData({
      ...emptyModalData(),
      ...product,
      is_enabled: product.is_enabled ?? 0,
    });
    modalRef.current?.showModal();
  }

  async function handleDeleteProduct(id) {
    try {
      if (!confirm("Are you sure you want to delete this product")) return;
      await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${id}`);
      getOrders();
    } catch (err) {
      console.error("Delete Failed", err);
    }
  }

  async function getOrders(page = null) {
    try {
      const {
        data: { orders, pagination },
      } = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/orders${
          page ? `?page=${page}` : ""
        }`
      );
      setCurrentPage(pagination.current_page);
      setTotalPages(pagination.total_pages);
      setOrders(orders);
    } catch (err) {
      console.error(err);
    }
  }

  function onPageChange(page) {
    setCurrentPage(page);
    getOrders(page);
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-primary"
          onClick={() => handleModalOperation(false)}
          disabled
        >
          Delete All Orders (disabled)
        </button>
      </div>
      <table className="table table-bordered">
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
          {orders?.map(({user, is_paid}, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.tel}</td>
              <td>{user.address}</td>
              <td>{is_paid ? "Yes" : "No"}</td>
              <td>
                N/A
                {/* <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleModalOperation(true, product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button> */}
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
      <ProductModal
        ref={modalRef}
        modalData={modalData}
        setModalData={setModalData}
        isEditMode={isEditMode}
        getProducts={getOrders}
      />
    </div>
  );
};

export default OrderManagement;

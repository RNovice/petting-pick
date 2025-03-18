import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductModal from "@/components/admin/ProductModal";
import Paginator from "@/components/common/Paginator";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/slice/loadingSlice";
import { notify } from "@/slice/notificationSlice";

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

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [modalData, setModalData] = useState(emptyModalData());
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
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
    const msg = { type: "success", msg: "Product deleted" };
    try {
      if (!confirm("Are you sure you want to delete this product")) {
        msg.type = "info";
        msg.msg = "Action cancelled";
        return;
      }
      await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${id}`);
      getProducts();
    } catch (err) {
      console.error("Delete Failed", err);
      msg.type = "fail";
      msg.msg = "Product delete failed";
    } finally {
      dispatch(notify(msg));
    }
  }

  async function getProducts(page = null) {
    try {
      dispatch(startLoading());
      const {
        data: { products, pagination },
      } = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products${
          page ? `?page=${page}` : ""
        }`
      );
      setCurrentPage(pagination.current_page);
      setTotalPages(pagination.total_pages);
      setProducts(products);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(stopLoading());
    }
  }

  function onPageChange(page) {
    setCurrentPage(page);
    getProducts(page);
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-primary"
          onClick={() => handleModalOperation(false)}
        >
          Add New Product
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Origin Price</th>
            <th>Price</th>
            <th>Is Enable</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.category}</td>
              <td>{product.title}</td>
              <td>{product.origin_price}</td>
              <td>{product.price}</td>
              <td>{product.is_enabled ? "Yes" : "No"}</td>
              <td>
                <button
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
      <ProductModal
        ref={modalRef}
        modalData={modalData}
        setModalData={setModalData}
        isEditMode={isEditMode}
        getProducts={getProducts}
      />
    </div>
  );
};

export default ProductManagement;

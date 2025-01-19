import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductModal from "@/components/ProductModal";
import Paginator from "@/components/Paginator";

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

const ProductBackOffice = ({ setIsLogin }) => {
  const [products, setProducts] = useState([]);
  const [modalData, setModalData] = useState(emptyModalData());
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const modalRef = useRef(null);

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
    try {
      if (!confirm("Are you sure you want to delete this product")) return;
      await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${id}`);
      getProducts();
    } catch (err) {
      console.error("Delete Failed", err);
    }
  }

  async function handleLogout() {
    try {
      const { status } = await axios.post(`${API_BASE}/logout`);
      if (status === 200) {
        document.cookie = "authToken; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        setIsLogin(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getProducts(page = null) {
    try {
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
    }
  }

  function onPageChange(page) {
    setCurrentPage(page);
    getProducts(page);
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
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

export default ProductBackOffice;

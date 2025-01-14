import { useState, useRef, Fragment } from "react";
import axios from "axios";
import { useEffect } from "react";

const env = import.meta.env;
const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = env;

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
});

const ProductEditor = ({ setIsLogin }) => {
  const [products, setProducts] = useState([]);
  const [modalData, setModalData] = useState(emptyModalData());
  const [isEditMode, setIsEditMode] = useState(false);
  const modalRef = useRef(null);
  const ogpref = useRef(null);

  useEffect(() => {
    getProducts();
  }, []);

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setModalData({
      ...modalData,
      [name]:
        type === "checkbox"
          ? +checked
          : name.includes("price")
          ? value.replace(/[^1-9.]|(?<=\..*)\./g, "").replace(/^\./, "")
          : value,
    });
  }

  function handleImagesInputChange(value, index) {
    setModalData((pre) => {
      const newImagesUrl = [...pre.imagesUrl];
      newImagesUrl[index] = value;
      return { ...pre, imagesUrl: newImagesUrl };
    });
  }

  function handleImagesSlotChange(isAddMethod) {
    setModalData((pre) => ({
      ...pre,
      imagesUrl: isAddMethod
        ? [...pre.imagesUrl, ""]
        : pre.imagesUrl.slice(0, -1),
    }));
  }

  function handleModalOperation(isEditMethod, product = emptyModalData()) {
    setIsEditMode(isEditMethod);
    setModalData({
      ...emptyModalData(),
      ...product,
      is_enabled: product.is_enabled ?? 0,
    });
    modalRef.current?.showModal();
  }

  async function handleSaveProduct(id = null) {
    const url = `${API_BASE}/api/${API_PATH}/admin/product/${id ? id : ""}`;

    const productData = {
      data: {
        ...modalData,
        origin_price: +modalData.origin_price,
        price: +modalData.price,
      },
    };

    try {
      id
        ? await axios.put(url, productData)
        : await axios.post(url, productData);

      getProducts();
      modalRef.current?.close();
    } catch (err) {
      console.error(
        `${id ? "Update" : "Add"} Failed`,
        err.response.data.message
      );
    }
  }

  async function handleDeleteProduct(id) {
    try {
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

  async function getProducts() {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products`);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
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
      <dialog className="modal-env" ref={modalRef}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content" style={{ maxHeight: "85vh" }}>
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditMode ? "Edit Product" : "Add New Product"}
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
                      className="form-label"
                      htmlFor="modal-input-main-img"
                    >
                      Main Picture URL
                    </label>
                    <input
                      id="modal-input-main-img"
                      type="text"
                      className="form-control"
                      name="imageUrl"
                      value={modalData.imageUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                  <label
                    className="mb-3 ratio ratio-16x9"
                    htmlFor="modal-input-main-img"
                  >
                    <img
                      src={modalData.imageUrl}
                      alt="Main Image Preview"
                      className="img-thumbnail"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </label>
                  {modalData.imagesUrl.map((url, i) => (
                    <Fragment key={`modal-input-other-img-${i + 1}`}>
                      <input
                        id={`modal-input-other-img-${i + 1}`}
                        type="text"
                        value={url}
                        onChange={(e) =>
                          handleImagesInputChange(e.target.value, i)
                        }
                        placeholder={`Image URL ${i + 1}`}
                        className="form-control mb-2"
                      />
                      {url !== "" && (
                        <label
                          className="mb-3 ratio ratio-16x9"
                          htmlFor={`modal-input-other-img-${i + 1}`}
                        >
                          <img
                            src={url}
                            alt={`Other Image ${i + 1} Preview`}
                            className="img-thumbnail"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </label>
                      )}
                    </Fragment>
                  ))}
                  <div className="d-flex justify-content-between gap-3">
                    {modalData.imagesUrl.length < 5 && (
                      <button
                        className="btn btn-warning w-100"
                        onClick={() => handleImagesSlotChange(true)}
                      >
                        Add Image
                      </button>
                    )}
                    {modalData.imagesUrl.length !== 0 && (
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => handleImagesSlotChange(false)}
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="modal-input-title">
                      Title
                    </label>
                    <input
                      id="modal-input-title"
                      type="text"
                      className="form-control"
                      name="title"
                      value={modalData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label"
                        htmlFor="modal-input-category"
                      >
                        Category
                      </label>
                      <input
                        id="modal-input-category"
                        type="text"
                        className="form-control"
                        name="category"
                        value={modalData.category}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor="modal-input-unit">
                        Unit
                      </label>
                      <input
                        id="modal-input-unit"
                        type="text"
                        className="form-control"
                        name="unit"
                        value={modalData.unit}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label"
                        htmlFor="modal-input-origin_price"
                      >
                        Origin Price
                      </label>
                      <input
                        ref={ogpref}
                        id="modal-input-origin_price"
                        type="text"
                        className="form-control"
                        name="origin_price"
                        value={modalData.origin_price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor="modal-input-price">
                        Price
                      </label>
                      <input
                        id="modal-input-price"
                        type="text"
                        className="form-control"
                        name="price"
                        value={modalData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label"
                      htmlFor="modal-input-description"
                    >
                      Description
                    </label>
                    <textarea
                      id="modal-input-description"
                      className="form-control"
                      name="description"
                      rows="2"
                      value={modalData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="modal-input-content">
                      Content
                    </label>
                    <textarea
                      id="modal-input-content"
                      className="form-control"
                      name="content"
                      rows="2"
                      value={modalData.content}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="form-check">
                    <input
                      id="modal-input-is_enabled"
                      type="checkbox"
                      className="form-check-input"
                      name="is_enabled"
                      checked={modalData.is_enabled ? true : false}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="modal-input-is_enabled"
                    >
                      Is Enable
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  handleSaveProduct(modalData.id ? modalData.id : null)
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductEditor;

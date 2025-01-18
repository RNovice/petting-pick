import {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  Fragment,
} from "react";
import axios from "axios";

const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = import.meta.env;

const ProductModal = forwardRef(
  ({ modalData, setModalData, isEditMode, getProducts }, ref) => {
    const modalRef = useRef(null);
    const [uploadingId, setUploadingId] = useState(null);

    useImperativeHandle(ref, () => ({
      showModal: () => modalRef.current?.showModal(),
      close: () => modalRef.current?.close(),
    }));

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
        const axiosError = err.response?.data.message;
        console.error(`${id ? "Update" : "Add"} Failed`, axiosError || err);
        axiosError && alert(axiosError.join`\n`);
      }
    }

    async function handleImageUpload(e, index = null) {
      setUploadingId(e.target.id);
      try {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file-to-upload", file);
        const {
          data: { imageUrl },
        } = await axios.post(
          `${API_BASE}/api/${API_PATH}/admin/upload`,
          formData
        );
        index === null
          ? setModalData({ ...modalData, imageUrl })
          : handleImagesInputChange(imageUrl, index);
      } catch (err) {
        console.error(err.response?.data.message || err);
        e.target.value = "";
      } finally {
        setUploadingId(null);
      }
    }

    return (
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
                    <div className="d-flex gap-2">
                      <label
                        htmlFor="upload-main-img"
                        className="btn btn-sm btn-primary d-flex align-items-center"
                      >
                        <span className="material-symbols-outlined">
                          upload
                        </span>
                        <input
                          className="d-none"
                          type="file"
                          id="upload-main-img"
                          accept="image/*"
                          onClick={(e) =>
                            uploadingId !== null && e.preventDefault()
                          }
                          onChange={(e) => handleImageUpload(e)}
                        />
                      </label>
                      {uploadingId === "upload-main-img" ? (
                        <div className="uploading form-control">上傳中</div>
                      ) : (
                        <input
                          id="modal-input-main-img"
                          type="text"
                          className="form-control"
                          name="imageUrl"
                          value={modalData.imageUrl}
                          onChange={handleInputChange}
                        />
                      )}
                    </div>
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
                      <div className="d-flex gap-2">
                        <label
                          htmlFor={`upload-other-img-${i + 1}`}
                          className="btn btn-sm btn-primary d-flex align-items-center"
                        >
                          <span className="material-symbols-outlined">
                            upload
                          </span>
                          <input
                            className="d-none"
                            type="file"
                            id={`upload-other-img-${i + 1}`}
                            accept="image/*"
                            onClick={(e) =>
                              uploadingId !== null && e.preventDefault()
                            }
                            onChange={(e) => handleImageUpload(e, i)}
                          />
                        </label>
                        {uploadingId === `upload-other-img-${i + 1}` ? (
                          <div className="uploading form-control">上傳中</div>
                        ) : (
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
                        )}
                      </div>
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
                    <label
                      className="form-label required-field"
                      htmlFor="modal-input-title"
                    >
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
                        className="form-label required-field"
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
                      <label
                        className="form-label required-field"
                        htmlFor="modal-input-unit"
                      >
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
                        aria-label="input origin price"
                        inputMode="decimal"
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
                        aria-label="input price"
                        inputMode="decimal"
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
    );
  }
);

export default ProductModal;

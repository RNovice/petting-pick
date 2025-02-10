import { forwardRef, useRef, useImperativeHandle, Fragment } from "react";
import ratingSvg from "@/assets/rating.svg";

const ProductDetailModal = forwardRef(({ modalData }, ref) => {
  const modalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    showModal: () => modalRef.current?.showModal(),
    close: () => modalRef.current?.close(),
  }));

  return (
    <dialog className="modal-env" ref={modalRef}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content" style={{ maxHeight: "85vh" }}>
          <div className="modal-header">
            <h5 className="modal-title">{modalData.title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => modalRef.current?.close()}
            ></button>
          </div>
          <div className="modal-body overflow-auto">
            <div className="row mb-3">
              <div className="col">
                <div className="ratio ratio-4x3">
                  <img
                    src={modalData.imageUrl}
                    alt="Main Image Preview"
                    className="img-thumbnail"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label>Category</label>
                      <div className="fs-5">{modalData.category}</div>
                    </div>
                    <div className="col-md-6">
                      <label>Rating</label>
                      <i
                        className="icon"
                        style={{
                          maskImage: `url(${ratingSvg})`,
                          background: `linear-gradient(to right, #dd0 0%, #dd0 ${modalData.rating}0%, #bbb ${modalData.rating}0%, #bbb 100%)`,
                          aspectRatio: "5/1",
                          height: "1.5rem",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <div className="fs-5">{modalData.description}</div>
                </div>
                <div className="mb-3">
                  <label>Content</label>
                  <div className="fs-5">{modalData.content}</div>
                </div>
                <div className="row mb-3">
                  <label>Price</label>
                  <small className="text-muted">
                    Origin <s>${modalData.origin_price}</s>
                  </small>
                  <div>
                    <span className="fs-2 text-danger">{modalData.price}</span>{" "}
                    / pre {modalData.unit}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {modalData.imagesUrl?.map((url, i) => (
                <div className="col" key={`modal-input-other-img-${i + 1}`}>
                  {url !== "" && (
                    <div
                      className="mb-3 ratio ratio-16x9"
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
                    </div>
                  )}
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
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
});

export default ProductDetailModal;

import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, handleAddToCart }) => {
  const navigate = useNavigate();

  function handleViewDetails(product) {
    navigate(`/products/${product.id}`, { state: product });
  }

  return (
    <div className="card h-100">
      <div className="ratio ratio-4x3">
        <img
          src={product.imageUrl}
          className="card-img-top"
          alt={product.title}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="card-body d-flex flex-column gap-3">
        <div>
        <h5 className="card-title">{product.title}</h5>
        <small>
          <s>${product.origin_price}</s>
        </small>
        <p className="card-text">${product.price}</p>
        </div>
        <div className="d-flex flex-wrap justify-content-between mt-auto">
          <button
            className="btn btn-primary me-2"
            onClick={() => handleAddToCart(product.id)}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleViewDetails(product)}
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

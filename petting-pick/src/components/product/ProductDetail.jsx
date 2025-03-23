import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/slice/loadingSlice";
import { addCartItem } from "@/slice/cartSlice";
import ratingSvg from "@/assets/images/rating.svg";
import AsideCart from "./AsideCart";
import ProductCard from "./productCard";
import api from "../../services/api";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [productData, setProducts] = useState(location.state || {});
  const [related, setRelated] = useState([]);
  const [notifications, setNotifications] = useState({
    msg: null,
    type: "",
    key: 0,
  });

  useEffect(() => {
    if (!productData?.id) {
      (async () => {
        try {
          const res = await api.get(`product/${id}`);
          setProducts(res.data.product);
        } catch (err) {
          const axiosError = err.response?.data?.message;
          console.error("Get Cart Failed", axiosError || err);
        }
      })();
    } else {
      setProducts(location.state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const category = productData?.category;
    if (!category) {
      setRelated([]);
      return;
    }
    (async () => {
      const { data } = await api.get(`products?category=${category}`);
      setRelated(data.products.filter(({ id: pid }) => id !== pid).slice(0, 3));
    })();
  }, [productData?.category, id]);

  async function handleAddToCart(id) {
    try {
      dispatch(startLoading());
      await dispatch(addCartItem(id));
      const key = Date.now();
      setNotifications({ msg: "Item Added", type: "success", key });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(stopLoading());
    }
  }

  if (!productData.id) {
    return <h2 className="text-center mt-5">Product Not Found</h2>;
  }

  return (
    <div className="container my-5">
      <AsideCart notifications={notifications} />
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="ratio ratio-4x3">
            <img
              src={productData.imageUrl}
              alt="Main Image"
              className="img-thumbnail"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column">
          <h2>{productData.title}</h2>
          <p className="text-muted">Category: {productData.category}</p>

          <div className="mb-3">
            <label>Rating</label>
            <i
              className="icon"
              style={{
                maskImage: `url("${ratingSvg}")`,
                background: `linear-gradient(to right, #dd0 0%, #dd0 ${productData.rating}0%, #bbb ${productData.rating}0%, #bbb 100%)`,
                aspectRatio: "5/1",
                height: "1.5rem",
              }}
            />
          </div>

          <p>{productData.description}</p>
          <p className="fw-bold">{productData.content}</p>

          <div>
            <small className="text-muted">
              Origin Price: <s>${productData.origin_price}</s>
            </small>
            <h3 className="text-danger">
              ${productData.price} / per {productData.unit}
            </h3>
          </div>
          <div className="flex-grow-1 d-flex">
            <button
              type="button"
              className="btn btn-primary mt-auto ms-auto"
              onClick={() => handleAddToCart(productData.id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        {productData.imagesUrl?.map((url, i) => (
          <div className="col-md-4" key={`product-image-${i}`}>
            {url && (
              <div className="ratio ratio-16x9">
                <img
                  src={url}
                  alt={`Other Image ${i + 1}`}
                  className="img-thumbnail"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {related.length > 0 && (
        <div className="row pt-2">
          <h3 className="mb-4">Products related to this item</h3>
          {related.map((item, i) => (
            <div className="col-md-4" key={`related-product-${i}`}>
              <ProductCard product={item} handleAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

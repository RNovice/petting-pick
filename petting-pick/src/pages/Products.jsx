import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/slice/loadingSlice";
import { addCartItem } from "@/slice/cartSlice";
import { updateProduct } from "@/slice/productSlice";
import Paginator from "../components/common/Paginator";
import AsideCart from "../components/product/AsideCart";
import ProductCard from "../components/product/productCard";
import api from "../services/api";
const icons = import.meta.glob("@/assets/images/categories/*.svg", {
  eager: true,
});
const iconsObj = Object.keys(icons).reduce((acc, path) => {
  const fileName = path.split("/").pop().replace(".svg", "");
  acc[fileName] = icons[path].default;
  return acc;
}, {});

const categoriesText = ["Dog", "Small Animal", "Aquarium", "Cat", "Bird"];
const categories = [
  { text: "Dog", icon: iconsObj["dog"] },
  { text: "Small Animal", icon: iconsObj["rabbit"] },
  { text: "Aquarium", icon: iconsObj["fish"] },
  { text: "Cat", icon: iconsObj["cat"] },
  { text: "Bird", icon: iconsObj["bird"] },
];

const Products = () => {
  const products = useSelector((state) => state.products?.data);
  const [filter, setFilter] = useState("All");
  const { total_pages: totalPages, current_page: currentPage } = useSelector(
    (state) => state.products?.pagination
  );
  const [notifications, setNotifications] = useState({
    msg: null,
    type: "",
    key: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

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

  const getProducts = async (page = 1) => {
    try {
      const {
        data: { products, pagination },
      } = await api(
        `products?page=${page}${
          categoriesText.includes(filter) ? `&category=${filter}` : ""
        }`
      );
      dispatch(updateProduct({ data: products, pagination }));
    } catch (err) {
      const axiosError = err.response?.data?.message;
      console.error("Get Product Failed", axiosError || err);
    }
  };

  const onPageChange = (page) => {
    getProducts(page);
  };

  return (
    <div className="container my-4">
      <AsideCart notifications={notifications} />
      <div className="row mb-5">
        <div className="mb-3 d-flex flex-wrap justify-content-between">
          <h2>Products</h2>
          <div className="d-flex flex-wrap gap-2">
            <div
              className={`btn btn-sm btn${
                filter === "All" ? "" : "-outline"
              }-primary rounded-pill d-flex align-items-center`}
              onClick={() => setFilter("All")}
            >
              All
            </div>
            {categories.map(({ text, icon }, i) => (
              <div
                className={`btn btn-sm btn${
                  filter === text ? "" : "-outline"
                }-primary rounded-pill d-flex align-items-center`}
                key={`category-filter-tag-${i}`}
                onClick={() => setFilter(text)}
                title={text}
              >
                <i
                  className="icon"
                  style={{
                    backgroundColor: "currentcolor",
                    maskImage: `url("${icon}")`,
                    width: 24,
                    height: 24,
                  }}
                />
                <span
                  className={`filter-tag ${filter === text ? "active" : ""}`}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
        {products.map((product) => (
          <div className="col-md-4 mb-3" key={`shop-product-${product.id}`}>
            <ProductCard product={product} handleAddToCart={handleAddToCart} />
          </div>
        ))}
        {totalPages > 1 && (
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Products;

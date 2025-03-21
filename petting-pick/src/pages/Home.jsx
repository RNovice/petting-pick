import { Link } from "react-router-dom";
import CustomersSay from "../components/home/CustomersSay";
import FeaturedProducts from "../components/home/FeaturedProducts";
import LuckyDraw from "../components/home/LuckyDraw";
import WhyUs from "../components/home/WhyUs";

const Home = () => {
  return (
    <div>
      <header className="bg-primary text-white text-center py-5">
        <h1 className="fw-bold text-light">Welcome to Petting Pick</h1>
        <p className="lead">Your one-stop shop for premium pet accessories</p>
        <Link to="/products" className="btn btn-light btn-lg mt-3">
          Shop Now
        </Link>
      </header>
      <FeaturedProducts />
      <hr />
      <LuckyDraw />
      <hr />
      <WhyUs />
      <hr />
      <CustomersSay />
    </div>
  );
};

export default Home;

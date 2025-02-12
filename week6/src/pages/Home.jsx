import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: "-OG2glP0UucOqNEzIwB4",
    price: 59,
    title: "Deluxe Dog Bed",
    imageUrl:
      "https://images.unsplash.com/photo-1598397678815-c5dc869035b8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "-OG2T4_KwAcXALCQH8tD",
    price: 99,
    title: "Bird Cage",
    imageUrl:
      "https://images.unsplash.com/photo-1552826580-0d47cf898dee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "-OG2RWNyoj6tNSAf7F11",
    price: 179,
    title: "Rabbit Hutch",
    imageUrl:
      "https://images.unsplash.com/photo-1611601361616-43a49bc718bd?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

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

      <section id="featured" className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          {featuredProducts.map((product, i) => (
            <div className="col-md-4" key={`featured-product-${i}`}>
              <div className="card shadow-sm">
                <div className="ratio ratio-4x3">
                  <img
                    src={product.imageUrl}
                    className="card-img-top"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    alt={product.title}
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                  <Link to={`products/${product.id}`} className="btn btn-primary">More Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">What Our Customers Say</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card p-3 shadow-sm">
                <p>"Great quality and fast shipping! My dog loves the bed!"</p>
                <strong>- Emily R.</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 shadow-sm">
                <p>"Best pet accessories store! Will definitely buy again."</p>
                <strong>- Mark T.</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 shadow-sm">
                <p>"Stylish and comfortable products for my cat!"</p>
                <strong>- Sarah L.</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

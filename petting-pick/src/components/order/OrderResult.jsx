import { Link } from "react-router-dom";

const OrderResult = ({ result }) => {
  return result.orderId ? (
    <div className="order-result d-flex justify-content-center align-items-center position-fixed">
      <div className="result-modal">
        <h3 className="mb-3">Order Successful!</h3>
        <p>Your order has been confirmed.</p>
        <p>Please check the details below:</p>
        <p className="fs-6">Order ID: {result?.orderId}</p>
        <p className="fs-6">
          Total Amount: {Math.round(result?.total * 1000) / 1000}
        </p>
        <p className="fs-6 mb-4">
          Order Date:{" "}
          {result?.create_at &&
            new Date(result.create_at * 1000).toLocaleDateString()}
        </p>
        <div className="d-flex justify-content-between">
          <Link className="btn btn-sm btn-primary" to="/">
            Return to Home
          </Link>
          <Link className="btn btn-sm btn-outline-primary" to="/products">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  ) : null;
};

export default OrderResult;

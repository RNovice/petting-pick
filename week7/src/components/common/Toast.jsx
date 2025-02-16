import { useSelector } from "react-redux";

function Toast() {
  const notification = useSelector((state) => state.notification);

  return (
    <div
      className="toast-container position-fixed"
      style={{ top: "80px", right: "1rem" }}
    >
      {notification.map((item, i) => (
        <div
          key={`toast-${i}`}
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div
            className={`toast-header text-white bg-${
              item.type === "fail" ? "danger" : item.type
            }`}
          >
            <strong className="me-auto" style={{textTransform: "uppercase"}}>{item.type}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              style={{filter: "invert(1)"}}
            />
          </div>
          <div className="toast-body" style={{backgroundColor:"#fff8"}}>{item.msg}</div>
        </div>
      ))}
    </div>
  );
}

export default Toast;

import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

const PageLoading = () => {
  const { value: isLoading, style } = useSelector((state) => state.loading);
  return isLoading ? (
    <div
      className="d-flex flex-column justify-content-center align-items-center position-fixed"
      style={{
        inset: 0,
        backgroundColor: style.bgColor || "#4444",
        zIndex: 100,
      }}
    >
      {style.text && (
        <span
          className="mb-3 fon"
          style={{
            color: style.color || "#fff",
            fontSize: style.fontSize || "1.25rem",
            fontWeight: "bold",
          }}
        >
          {style.text || "Loading"}
        </span>
      )}
      <ReactLoading
        type={style.type || "spinningBubbles"}
        color={style.color || "#fff"}
        width={style.width || "5rem"}
        height={style.height || "5rem"}
      />
    </div>
  ) : (
    <></>
  );
};

export default PageLoading;

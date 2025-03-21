import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import PageLoading from "./components/common/PageLoading";
import Toast from "./components/common/Toast";
import { useDispatch } from "react-redux";
import { checkLogin } from "@/slice/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <PageLoading />
      <Toast/>
    </>
  );
}

export default App;

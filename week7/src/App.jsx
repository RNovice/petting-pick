import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import PageLoading from "./components/common/PageLoading";
import { useDispatch } from "react-redux";
import { checkLogin } from "@/slice/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin())
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <PageLoading />
    </>
  );
}

export default App;

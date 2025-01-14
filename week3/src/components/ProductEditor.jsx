import { useState, useRef } from "react";
import axios from "axios";

const env = import.meta.env;
const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = env;

const emptyModalData = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enable: false,
};

const ProductEditor = ({ setIsLogin, products }) => {

  return (
    <></>
  );
};

export default ProductEditor;

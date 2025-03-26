import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Lấy danh sách sản phẩm
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    return [];
  }
};

// Thêm sản phẩm mới
export const addProduct = async (name, price) => {
  try {
    const response = await axios.post(API_URL, { name, price });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    return null;
  }
};

import React, { useEffect, useState, useCallback } from "react";
import { Container, Grid, Typography, TextField } from "@mui/material";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import EditProduct from "./EditProduct"; // Import component chỉnh sửa
import { debounce } from "lodash";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null); // State lưu sản phẩm đang chỉnh sửa

  // Hàm lấy danh sách sản phẩm từ API
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  }, []);

  // Tìm kiếm sản phẩm (debounce 500ms)
 const searchProducts = useCallback(
  debounce(async (query) => {
    if (!query) {
      await fetchProducts(); // Thêm await nếu fetchProducts là async
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/search?search=${encodeURIComponent(query)}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    }
  }, 500),
  [fetchProducts, setProducts] // Thêm setProducts nếu nó thay đổi trong component
);

  // Lấy dữ liệu sản phẩm ngay khi vào trang
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  // Khi nhấn "Sửa", lưu sản phẩm vào state và mở form chỉnh sửa
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  // Đóng form chỉnh sửa
  const closeEditForm = () => {
    setEditingProduct(null);
  };

  // Cập nhật sản phẩm
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/${updatedProduct._id}`,
        updatedProduct
      );
      fetchProducts();
      setEditingProduct(null); // Đóng form sau khi cập nhật thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return (
    <Container>
      <Typography
        variant="h3"
        sx={{
          my: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: "#1976D2",
        }}
      >
        QUẢN LÝ SẢN PHẨM
      </Typography>

      {/* Ô tìm kiếm */}
      <TextField
        label="🔍 Nhập tên sản phẩm..."
        variant="outlined"
        fullWidth
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            fontSize: "16px",
          },
        }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          searchProducts(e.target.value);
        }}
      />

      {/* Hiển thị danh sách sản phẩm */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      {/* Form chỉnh sửa sản phẩm (popup) */}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={closeEditForm}
          onSave={handleUpdateProduct}
        />
      )}
    </Container>
  );
};

export default Home;

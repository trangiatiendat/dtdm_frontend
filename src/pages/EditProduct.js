import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const EditProduct = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  // Xử lý khi chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setEditedProduct({ ...editedProduct, image: reader.result });
      };
    }
  };

  const handleSubmit = () => {
    onSave(editedProduct);
  };

  return (
    <Dialog open={!!product} onClose={onClose} fullWidth>
      <DialogTitle>📝 Chỉnh sửa sản phẩm</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên sản phẩm"
          name="name"
          fullWidth
          value={editedProduct.name}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Giá"
          name="price"
          type="number"
          fullWidth
          value={editedProduct.price}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        {/* Chọn ảnh */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: "16px", marginBottom: "16px" }}
        />

        {/* Hiển thị ảnh preview */}
        {editedProduct.image && (
          <img
            src={editedProduct.image}
            alt="Ảnh sản phẩm"
            style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
          />
        )}

        <TextField
          label="Loại"
          name="category"
          fullWidth
          value={editedProduct.category}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Mô tả"
          name="description"
          fullWidth
          multiline
          rows={3}
          value={editedProduct.description}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProduct;

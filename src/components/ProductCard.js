import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        p: 2,
        textAlign: "center",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      }}
    >
      {product.image && (
        <CardMedia
          component="img"
          height="180"
          image={product.image}
          alt={product.name}
          sx={{ borderRadius: "10px", objectFit: "cover" }}
        />
      )}
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ fontSize: "16px", fontWeight: "bold", color: "#D32F2F" }}
        >
          {product.price.toLocaleString()} VNĐ
        </Typography>
        <Typography
          color="primary"
          sx={{ fontSize: "14px", fontWeight: "bold", mt: 1 }}
        >
          Loại: {product.category}
        </Typography>
        <Typography sx={{ fontSize: "12px", mt: 1 }}>
          {product.description}
        </Typography>
        <Button
          variant="outlined"
          color="warning"
          sx={{ mt: 2, mx: 1, fontWeight: "bold" }}
          onClick={() => onEdit(product)}
        >
          ✏️ Sửa
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 2, fontWeight: "bold" }}
          onClick={() => onDelete(product._id)}
        >
          ❌ Xóa
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

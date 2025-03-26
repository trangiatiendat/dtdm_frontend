import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Avatar,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProduct({ ...product, image: reader.result });
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://dtdmbackend-production.up.railway.app/api/products", product);
      alert("Thêm sản phẩm thành công!");
      setProduct({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 2, fontWeight: "bold", color: "#1976D2" }}
        >
          🛍️ Thêm sản phẩm mới
        </Typography>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Tên sản phẩm"
                name="name"
                value={product.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Giá sản phẩm"
                name="price"
                value={product.price}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Loại sản phẩm"
                name="category"
                value={product.category}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mô tả sản phẩm"
                name="description"
                value={product.description}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>

            {/* Upload hình ảnh */}
            <Grid item xs={12} textAlign="center">
              <input
                type="file"
                accept="image/*"
                id="upload-image"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="upload-image">
                <Button
                  variant="contained"
                  component="span"
                  color="secondary"
                  startIcon={<AddPhotoAlternateIcon />}
                  sx={{ mb: 2 }}
                >
                  Tải ảnh lên
                </Button>
              </label>
              {product.image && (
                <Avatar
                  src={product.image}
                  alt="Product Preview"
                  sx={{
                    width: 100,
                    height: 100,
                    margin: "auto",
                    border: "2px solid #1976D2",
                  }}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            sx={{
              width: "50%",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "12px",
            }}
          >
            Thêm sản phẩm
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default AddProduct;

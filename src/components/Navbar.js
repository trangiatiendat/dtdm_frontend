import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          CỬA HÀNG DHMART
        </Typography>
        <Button
          color="inherit"
          sx={{ fontWeight: "bold", color: "orange" }}
          component={Link}
          to="/"
        >
          TRANG CHỦ
        </Button>
        <Button
          color="inherit"
          sx={{ fontWeight: "bold", color: "yellow" }}
          component={Link}
          to="/add-product"
        >
          THÊM SẢN PHẨM
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

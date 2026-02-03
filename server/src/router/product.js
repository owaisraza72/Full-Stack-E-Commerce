const express = require("express");
const { Product } = require("../model/product");
const productRouter = express.Router();
const { authMiddleware } = require("../middleware/auth");

/* ================= ADD PRODUCT (Seller / Admin) ================= */
productRouter.post("/addProduct", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "seller" && req.user.role !== "admin") {
      return res.status(403).send({ message: "Access denied" });
    }

    const { name, price, description, imageUrl, category, stock } = req.body;

    const product = new Product({
      name,
      price,
      description,
      imageUrl,
      category,
      stock,
      seller: req.user._id, // ✅ multi-seller base
    });

    await product.save();
    res.status(201).send({ message: "Product added successfully", product });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/* ================= GET ALL PRODUCTS (Public) ================= */
productRouter.get("/getAllProducts", async (req, res) => {
  try {
    const products = await Product.find({}).populate("seller", "name email");
    res.status(200).send({ products });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/* ================= GET SINGLE PRODUCT ================= */
productRouter.get("/getProduct/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email",
    );

    if (!product) return res.status(404).send({ message: "Product not found" });

    res.status(200).send({ product });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/* ================= UPDATE PRODUCT ================= */
productRouter.put("/updateProduct/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send({ message: "Product not found" });

    // 🔐 ownership + admin check
    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).send({ message: "Not allowed" });
    }

    Object.assign(product, req.body);
    await product.save();

    res.status(200).send({ message: "Product updated", product });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/* ================= DELETE PRODUCT ================= */
productRouter.delete("/deleteProduct/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send({ message: "Product not found" });

    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).send({ message: "Not allowed" });
    }

    await product.deleteOne();
    res.status(200).send({ message: "Product deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { productRouter };

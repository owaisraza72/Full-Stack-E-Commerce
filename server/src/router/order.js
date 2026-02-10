const express = require("express");
const orderRouter = express.Router();
const { Order } = require("../model/order");
const { authMiddleware } = require("../middleware/auth");
const { clearCart } = require("../controller/cartController");

/* ================= CREATE ORDER ================= */
orderRouter.post("/create", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress,
    });

    await order.save();
    await clearCart(req.user._id);
    res.status(201).send({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/* ================= GET USER ORDERS ================= */
orderRouter.get("/myOrders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name imageUrl price")
      .sort({ createdAt: -1 });
    res.status(200).send({ orders });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/* ================= GET SINGLE ORDER ================= */
orderRouter.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("items.product", "name imageUrl price");
    if (!order) return res.status(404).send({ message: "Order not found" });

    res.status(200).send({ order });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { orderRouter };

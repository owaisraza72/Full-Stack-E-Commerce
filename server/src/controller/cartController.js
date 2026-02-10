const { Cart } = require("../model/cart");
const { Product } = require("../model/product");

/* ================= ADD TO CART ================= */
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).send({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });

    // 🆕 cart create if not exists
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).send({ message: "Added to cart", cart });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

/* ================= GET CART ================= */
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price imageUrl"
    );

    if (!cart)
      return res.status(200).send({ items: [] });

    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

/* ================= REMOVE FROM CART ================= */
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart)
      return res.status(404).send({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).send({ message: "Item removed", cart });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

/* ================= CLEAR CART (after order) ================= */
const clearCart = async (userId) => {
  await Cart.findOneAndDelete({ user: userId });
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
};

const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');


const recalcTotal = (cart) => {
  let total = 0;
  for (const it of cart.items) {
    if (it.product && it.product.price) {
      total += it.product.price * it.quantity;
    }
  }
  return Number(total.toFixed(2));
};

const getCart = async (req, res) => {
  try {
   
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });


    cart.totalPrice = recalcTotal(cart);
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const addItem = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ message: 'Invalid productId' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const cart = await Cart.findOne({ user: req.user._id }) || new Cart({ user: req.user._id });


    const existing = cart.items.find(it => it.product.toString() === productId);
    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      cart.items.push({ product: product._id, quantity: Number(quantity) });
    }


    await cart.populate('items.product');
    cart.totalPrice = recalcTotal(cart);
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const newItems = cart.items.filter(it => it.product._id.toString() !== productId);
    cart.items = newItems;
    cart.totalPrice = recalcTotal(cart);
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCart, addItem, removeItem };
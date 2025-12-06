const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// get products
router.get('/', async (req, res) => {
   // res.send("Product API is running");
   try {
      const products = await Product.find({});
      return res.status(200).json({ data: products })
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
})

// get product by id
router.get('/:id', async (req, res) => {
   const id = req.params.id;
   try {
      const product = await Product.findById(id);
      return res.status(200).json(product);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
})

// create product
router.post('/', async (req, res) => {
   try {
      if (!req.body) {
         return res.status(400).json({ error: "Product details are missing" });
      }
      const { name, price, description, image } = req.body;
      const newProduct = new Product({
         name,
         price,
         description,
         image
      });
      await newProduct.save();
      return res.status(201).json({ message: "Product created successfully", product: newProduct });
   } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
   }
})

// update product
router.put('/:id', async (req, res) => {
   const id = req.params.id;
   try {
      if (!id) {
         return res.status(400).json({ error: `Product with ID ${id} is missing` });
      }
      const { name, price, description, image } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(id, {
         name,
         price,
         description,
         image
      }, { new: true });
      return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
   } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
   }
})

// delete product
router.delete('/:id', async (req, res) => {
   const id = req.params.id;
   // if (!id) {
   //    return res.status(400).json({ message: `Product with ID ${id} is not found` });
   // }
   try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
         return res.status(404).json({ message: "Product not found" })
      }
      return res.status(200).json({ message: `Product with id ${id} deleted successfully ` });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
})

module.exports = router;
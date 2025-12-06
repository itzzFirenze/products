const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/products', productRoutes);
app.use('/users', userRoutes);

async function main() {
   try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected Successfully");
   } catch (error) {
      console.error("MongoDB Connection Error:", error);
   }
}

main();

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
   const navigate = useNavigate();
   const [product, setProduct] = useState({
      name: '',
      image: '',
      price: '',
      description: ''
   });

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await fetch("https://products-backend-bem0.onrender.com/products", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               name: product.name,
               price: product.price,
               description: product.description,
               image: product.image
            })
         });
         navigate('/products');
         // const data = await res.json();
         // console.log(data);
         // alert("Product added successfully!");
         // setProduct({
         //    name: "",
         //    image: "",
         //    price: "",
         //    description: ""
         // });
      } catch (error) {
         console.error("Error uploading product:", error);
         alert("Error adding product. Please try again.");
      }
   };

   return (
      <div className='bg-gray-50 min-h-screen flex items-center justify-center p-6'>
         <div className="max-w-2xl w-full mx-auto">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
               <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h2>
                  <p className="text-gray-600">Fill in the details to add a new product to your inventory</p>
               </div>
               
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                     <label className="block text-sm font-medium text-gray-900 mb-2">
                        Product Name
                     </label>
                     <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 focus:outline-none transition"
                        placeholder="Enter product name"
                        required
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-900 mb-2">
                        Image URL
                     </label>
                     <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 focus:outline-none transition"
                        placeholder="https://example.com/image.jpg"
                        required
                     />
                     {product.image && (
                        <div className="mt-3">
                           <img 
                              src={product.image} 
                              alt="Preview" 
                              className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                              onError={(e) => e.target.style.display = 'none'}
                           />
                        </div>
                     )}
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-900 mb-2">
                        Price
                     </label>
                     <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                           type="number"
                           name="price"
                           value={product.price}
                           onChange={handleInputChange}
                           className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 focus:outline-none transition"
                           placeholder="0.00"
                           step="0.01"
                           min="0"
                           required
                        />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-900 mb-2">
                        Description
                     </label>
                     <textarea
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 focus:outline-none transition resize-none"
                        placeholder="Enter a detailed description of the product"
                        required
                     />
                  </div>

                  <div className="flex gap-3 pt-4">
                     <button
                        type="submit"
                        className="flex-1 bg-blue-700 text-white py-2.5 px-4 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium transition"
                     >
                        Add Product
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default AddProduct;
import React, { useState, useEffect } from 'react';

const Products = () => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      fetchProducts();
   }, []);

   const fetchProducts = async () => {
      try {
         const res = await fetch('https://products-backend-bem0.onrender.com/products');
         const data = await res.json();
         setProducts(data.data);
      } catch (error) {
         console.error('Error fetching products:', error);
      }
   }

   return (
      <section className="text-gray-600 body-font">
         <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
               {products.map((product) => (
                  <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                     <a className="block relative h-48 rounded overflow-hidden">
                        <img
                           alt={product.name}
                           className="object-cover object-center w-full h-full block"
                           src={product.image || 'https://dummyimage.com/420x260'}
                        />
                     </a>
                     <div className="mt-4">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                           {product.category || 'CATEGORY'}
                        </h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                           {product.name}
                        </h2>
                        <p className="mt-1">₹{product.price}</p>
                        {product.description && (
                           <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                              {product.description}
                           </p>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default Products;
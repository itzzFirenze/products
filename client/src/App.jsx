import React, { useState } from 'react'
import logo from './assets/nike-logo.png';
import Home from './components/Home';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   return (
      <Router>
         <nav className='bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200'>
            <div className='max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4'>
               <Link to='/' className='flex items-center space-x-3'>
                  <img src={logo} className='h-7' alt='Nike Logo' />
               </Link>
               <div className='flex md:order-2 space-x-3 md:space-x-0'>
                  <button
                     type='button'
                     className='text-white bg-blue-700 hover:bg-blue-800 border border-transparent focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 focus:outline-none'
                  >
                     Get started
                  </button>
                  <button
                     onClick={() => setIsMenuOpen(!isMenuOpen)}
                     type='button'
                     className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
                     aria-controls='navbar-sticky'
                     aria-expanded={isMenuOpen}
                  >
                     <span className='sr-only'>Open main menu</span>
                     <svg className='w-6 h-6' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                        <path stroke='currentColor' strokeLinecap='round' strokeWidth='2' d='M5 7h14M5 12h14M5 17h14' />
                     </svg>
                  </button>
               </div>
               <div className={`items-center justify-between ${isMenuOpen ? '' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id='navbar-sticky'>
                  <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white'>
                     <li>
                        <Link
                           to='/'
                           className='block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0'
                           aria-current='page'
                        >
                           Home
                        </Link>
                     </li>
                     <li>
                        <Link
                           to='/products'
                           className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                        >
                           Products
                        </Link>
                     </li>
                     <li>
                        <Link
                           to='/addproduct'
                           className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                        >
                           Add Product
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
         <div className='pt-20'>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/products' element={<Products />} />
               <Route path='/addproduct' element={<AddProduct />} />
            </Routes>
         </div>
      </Router>
   )
}

export default App
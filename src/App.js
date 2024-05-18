import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import Register from './Register';
import Login from './Login';
import Product from './Product';
import ProductDetail from './ProductDetail';
import Seller from './Seller';

const App = () => {
    return (
        <Router>
            <Header />
            <body >
            <main>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/products' element={<Product />} />
                    <Route path='/products/:id' element={<ProductDetail />} />
                    <Route path='/sell/:id' element={<Seller />} />
                </Routes>
            </main>
            </body>
            <Footer />
        </Router>
    );
};

export default App;

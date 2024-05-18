import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('localhost:3500/products',{},{headers: {Authorization: `Bearer ${token}`}});
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product-item">
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <Link to={`/product/${product.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
};

export default Product;

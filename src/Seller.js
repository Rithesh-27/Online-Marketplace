import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';

const Seller = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const fetchSellerProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('localhost:3500/sell', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching seller products', error);
            }
        };
        fetchSellerProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/seller/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    return (
        <div className="seller-dashboard">
            <h2>Your Products</h2>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <button onClick={() => setEditingProduct(product)}>Update</button>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <AddProduct setProducts={setProducts} />
            {editingProduct && <UpdateProduct product={editingProduct} setProducts={setProducts} setEditingProduct={setEditingProduct} />}
        </div>
    );
};

export default Seller;

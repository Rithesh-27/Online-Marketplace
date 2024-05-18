import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct = ({ product, setProducts, setEditingProduct }) => {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [image, setImage] = useState(product.image);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`localhost:3500/sell/${product.id}`, {
                name,
                description,
                price,
                image
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(products => products.map(p => p.id === product.id ? response.data : p));
            setEditingProduct(null);
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    return (
        <form className="update-product-form" onSubmit={handleSubmit}>
            <h3>Update Product</h3>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
            <button type="submit">Update Product</button>
            <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
        </form>
    );
};

export default UpdateProduct;

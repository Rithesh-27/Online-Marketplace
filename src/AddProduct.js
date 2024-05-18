import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ setProducts }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('localhost:3500/sell', {
                name,
                description,
                price,
                image
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(products => [...products, response.data]);
            setName('');
            setDescription('');
            setPrice('');
            setImage('');
        } catch (error) {
            console.error('Error adding product', error);
        }
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <h3>Add New Product</h3>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;

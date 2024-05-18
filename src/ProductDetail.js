import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`/api/products/${id}`,{},{headers: {Authorization: `Bearer ${token}`}});
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details', error);
            }
        };
        fetchProductDetail();
    }, [id]);

    const handleBuy = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`localhost:3500/products/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Purchase successful');
            navigate('/')
        } catch (error) {
            console.error('Error purchasing product', error);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={handleBuy}>Buy</button>
        </div>
    );
};

export default ProductDetail;

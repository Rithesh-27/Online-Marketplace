import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('localhost:3500/auth/login', { username, password });
            if (response.data.success) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                navigate('/');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error logging in user', error);
            alert('An error occurred');
        }
    };

    return (
        <div className='form-container'>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className='form-group'>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

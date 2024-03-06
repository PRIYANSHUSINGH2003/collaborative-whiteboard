// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/auth/login', { username, password });
            const { token } = response.data;
            setToken(token);
            
        } catch (error) {
            console.error('Login failed:', error.response.data.error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/4 bg-gray-100 p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded">
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;

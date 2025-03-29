import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        if (username === '' || password === '') {
            setError('Username and password cannot be empty.');
            return;
        }

        const backendEndpoint = "http://127.0.0.1:5000/validate_login";
        try {
            const response = await fetch(backendEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'username': username, 'password': password }),
            });
            const data = await response.json();
            if (response.ok) {
                if (data['result'] === 'success') {
                    setError('');
                    setTimeout(() => navigate("/predict"), 2000);
                } else {
                    setError('Invalid username or password.');
                }
            } else {
                setError('Form submission failed.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        }
    }

    return (
        <div className="LoginForm">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Username:</label><br />
                <input
                    name='username'
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                /><br />
                <label>Password:</label><br />
                <input
                    name='password'
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <input type="submit" className="submit" />
                <p className="loginError">{error}</p>
            </form>
        </div>
    );
}
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
            });
            // Sauvegarder le token dans localStorage ou state
            localStorage.setItem('token', response.data.token);
            alert('Connexion réussie!');
            navigate('/dashboard'); // Redirection après la connexion réussie
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Une erreur est survenue');
        }
    };

    return (
        <div className="login-page">
            <h2>Se connecter</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default LoginPage;

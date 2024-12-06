import { useState } from 'react';
import API from '../../utils/axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setMessage('Inicio de sesión exitoso');
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error en el inicio de sesión');
        }
    };

    return (
        <div>
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;

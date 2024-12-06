import{ useState } from 'react';
import API from '../../utils/axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error al solicitar recuperación');
        }
    };

    return (
        <div>
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleForgotPassword}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Recuperar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgotPassword;

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../utils/axios';

function ResetPassword() {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post(`/reset-password/${token}`, { token, newPassword });
            setMessage(response.data.message);
        } catch (error) {
            console.log(error)
            setMessage(error.response?.data?.error || 'Error al restablecer la contraseña');
        }
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleResetPassword}>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Restablecer</button>
            </form>
            {message && <p>{JSON.stringify(message)}</p>}
        </div>
    );
}

export default ResetPassword;

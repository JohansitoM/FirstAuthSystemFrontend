import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../utils/axios';

function VerifyEmail() {
    const { token } = useParams();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await API.get(`/verify-email/${token}`);
                setMessage(response.data.message);
            } catch (error) {
                setMessage(error.response?.data?.error || 'Error al verificar el correo');
            }
        };
        verifyEmail();
    }, [token]);

    return <div>{message}</div>;
}

export default VerifyEmail;

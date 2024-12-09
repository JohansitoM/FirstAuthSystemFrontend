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
        <div className="w-screen h-screen bg-[#0D0D28] flex items-center justify-center rounded-xl">
            <section className={"w-1/3 text-xl "}>

                <h2 className={"font-black text-5xl"}>Restablecer Contraseña</h2>
                <section className="flex flex-col items-center justify-center gap-4 bg-[#1d1f36] p-4 rounded-xl">

                    <form onSubmit={handleResetPassword}>
                        <div className="flex rounded-xl flex-col px-4 py-2 h-auto items-start bg-[#37445d] mb-3">
                            <input
                                className={"text-white focus:outline-none w-full h-8 bg-transparent p-0 text-3xl active:border-0"}
                                type="password"
                                placeholder="Nueva contraseña"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <button type='submit' className={"  rounded-full flex items-center justify-center text-4xl font-bold w-1/2 h-12 p-0 mx-auto bg-white text-[#1d1f36] focus:outline-none"}>Restablecer</button>
                    </form>
                    {message && <p>{message}</p>}
                </section>
            </section>
        </div>
    );
}

export default ResetPassword;

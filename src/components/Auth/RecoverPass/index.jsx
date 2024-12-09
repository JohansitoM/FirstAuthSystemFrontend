import{ useState } from 'react';
import API from '../../../utils/axios';

const RecoverPass = () => {
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
        <>
            <main className="w-screen h-screen bg-[#0D0D28] flex items-center justify-center rounded-xl">
                <section className={"w-1/3 text-xl "}>
                    <h1 className={"font-black text-5xl"}>¿Olvidaste tu correo?</h1>
                    <section className="flex flex-col items-center justify-center gap-4 bg-[#1d1f36] p-4 rounded-xl">
                        <p className="flex text-2xl text-left">
                            Te enviaremos un correo para restablecer tu contraseña
                        </p>
                        <form onSubmit={handleForgotPassword}>
                            <div className="flex rounded-xl flex-col px-4 py-2 h-auto items-start bg-[#37445d] mb-3">
                                <label className={"text-slate-400 text-xm h-5"} htmlFor="email">EMAIL</label>
                                <input
                                    className={"text-white focus:outline-none w-full h-4 bg-transparent p-0 text-3xl active:border-0"}
                                    type={"email"} placeholder={"pancracia@gmail.com"}
                                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <button type='submit' className={"mb-8  rounded-full flex items-center justify-center text-4xl font-bold w-1/2 h-12 p-0 mx-auto bg-white text-[#1d1f36] focus:outline-none"}>
                                Enviar
                            </button>
                            {message && <p>{message}</p>}
                        </form>
                    </section>
                </section>
            </main>
        </>
    )
}

export default RecoverPass
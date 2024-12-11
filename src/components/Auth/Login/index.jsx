import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import API from "../../../utils/axios"
import GoogleLoginButton from '../GoogleLoginButton'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/users')
            setMessage('Inicio de sesión exitoso');
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error en el inicio de sesión');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await API.get('/google', {
                token: credentialResponse.credential,
            })
            localStorage.setItem('token', response.data.token); // Almacenar token jwt
            alert('Inicio de sesión exitoso')
        } catch (error) {
            console.error('Error al iniciar sesión con Google', error.message)
        }
    }

    const handleGoogleError = () => {
        console.error('Error al iniciar sesión con Google')
    }

    return (
        <>
            <main className="w-screen h-screen bg-[#0D0D28] flex items-center justify-center">
                <div className={"w-1/3 text-xl"}>
                    <h1 className={"font-black"}>Iniciar sesión</h1>

                    <form className={"flex flex-col items-center px-8 py-8 bg-[#1d1f36] w-full h-auto rounded-xl"}
                          onSubmit={handleLogin}
                    >
                        <div className={"flex rounded-xl flex-col px-4 py-2 h-auto items-start bg-[#37445d] mb-3"}>
                            <label className={"text-slate-400 text-xm h-5"} htmlFor="email">EMAIL</label>
                            <input className={"text-white focus:outline-none text-slate-400 w-full h-4 bg-transparent p-0 text-3xl active:border-0"}
                                   placeholder={'pancracia@gmail.com'}
                                   type={'email'}
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required={true}
                            />
                        </div>
                        <div className={"flex rounded-xl flex-col px-4 py-2 h-auto items-start bg-[#37445d] mb-3"}>
                            <label className={"text-slate-400 text-xm h-5"} htmlFor="password">CONTRASEÑA</label>
                            <input className={"text-white focus:outline-none text-slate-400 w-full h-4 bg-transparent p-0 text-3xl active:border-0"}
                                   type={'password'}
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required={true}
                            />
                        </div>
                        <div className={"flex justify-between w-full"}>
                            <Link to={"/register"}>No tengo cuenta</Link>
                            <Link to={"/recoverPass"}>Olvidé mi contraseña</Link>
                        </div>

                        <GoogleLoginButton 
                            className={"m-4  rounded-full flex items-center justify-center text-4xl font-bold w-1/2 h-12 p-0 bg-white text-[#1d1f36] focus:outline-none"}
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                        />

                        <button className={"mb-8  rounded-full flex items-center justify-center text-4xl font-bold w-1/2 h-12 p-0 bg-white text-[#1d1f36] focus:outline-none"}
                            type={"submit"}
                        >Continuar</button>
                        {message && <p>{message}</p>}
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login 
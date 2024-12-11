import {Link, useNavigate} from "react-router-dom";
import API from '../../../utils/axios';
import {useState} from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Todos los campos son obligatorios");
            return;
        }

        if(password !== confirmPassword) {
            alert('Las contraseñas no coinciden')
            return;
        }
        try {
            const response = await API.post('register', { name, email, password })
            setResponseMessage(response.data.message)
            alert('Registro exitoso, verifica tu correo')
            navigate('/login')
        } catch (err) {
            setResponseMessage(err.response?.data?.message || 'Error en el registro')
        }
    }

    return (
        <>
            <main className="w-screen h-screen bg-[#0D0D28] flex items-center justify-center">
                <div className={"w-1/3 text-xl"}>
                    <h1 className={"font-black"}>Registro</h1>

                    <form
                        onSubmit={handleSignUp}
                        className={"flex flex-col items-center px-8 py-8 bg-[#1d1f36] w-full h-auto rounded-xl"}>
                        <div className={"flex rounded-xl flex-col px-4 py-2 h-auto items-start bg-[#37445d] mb-3"}>
                            <label className={"text-slate-400 text-xm h-5"} htmlFor="nombre">NOMBRE</label>
                            <input
                                type={'text'}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={"text-white focus:outline-none  w-full h-4 bg-transparent p-0 text-3xl active:border-0"}
                                placeholder={'pancracia'}/>
                        </div>
                        <div className={"flex rounded-xl flex-col px-4 py-2 h-auto items-start bg-[#37445d] mb-3"}>
                            <label className={"text-slate-400 text-xm h-5"} htmlFor="email">EMAIL</label>
                            <input
                                className={"text-white focus:outline-none  w-full h-4 bg-transparent p-0 text-3xl active:border-0"}
                                placeholder={'pancracia@gmail.com'}
                                type={'email'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={"flex rounded-xl flex-col px-4 py-2 h-auto items-start bg-[#37445d] mb-3"}>
                            <label className={"text-slate-400 text-xm h-5"} htmlFor="password">CONTRASEÑA</label>
                            <input
                                className={"text-white focus:outline-none w-full h-4 bg-transparent p-0 text-3xl active:border-0"}
                                type={'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={"flex rounded-xl flex-col px-4 py-2 h-auto items-start bg-[#37445d] mb-3"}>
                            <label className={"text-slate-400 text-xm h-5"} htmlFor="password">CONFIRMAR CONTRASEÑA</label>
                            <input
                                className={"text-white focus:outline-none w-full h-4 bg-transparent p-0 text-3xl active:border-0"}
                                type={'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className={"flex justify-center w-full"}>
                            <Link to={"/login"}>Ya tengo una cuenta</Link>
                        </div>
                        <button
                            className={"mb-8  rounded-full flex items-center justify-center text-4xl font-bold w-1/2 h-12 p-0 bg-white text-[#1d1f36] focus:outline-none"}
                            type={'submit'}
                        >Continuar
                        </button>
                        {responseMessage && <p>{responseMessage}</p>}
                    </form>
                    
                </div>
            </main>
        </>
    )
}

export default Register;
import { Link } from 'react-router-dom';
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Iniciando sesión con: ', { email, password });
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
                            <Link to={"/signup"}>No tengo cuenta</Link>
                            <Link to={"/recoverPass"}>Olvidé mi contraseña</Link>
                        </div>
                        <button className={"mb-8  rounded-full flex items-center justify-center text-4xl font-bold w-1/2 h-12 p-0 bg-white text-[#1d1f36] focus:outline-none"}
                            type={"submit"}
                        >Continuar</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export { Login }
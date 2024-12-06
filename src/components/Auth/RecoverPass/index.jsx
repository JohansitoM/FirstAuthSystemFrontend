const RecoverPass = () => {
    return (
        <>
            <main className="w-screen h-screen bg-[#0D0D28] flex items-center justify-center">
                <section className={"w-1/3 text-xl"}>
                    <h1 className={"font-black"}>¿Olvidaste tu correo?</h1>
                    <section className="bg-[#1d1f36]">
                        <p className="flex">
                            Te enviaremos un correo para restablecer tu contraseña
                        </p>
                        <form>
                            <div className="flex rounded-xl flex-col px-4 py-2 h-auto items-start bg-[#37445d] mb-3">
                                <label className={"text-slate-400 text-xm h-5"} htmlFor="email">EMAIL</label>
                                <input
                                    className={"text-white focus:outline-none w-full h-4 bg-transparent p-0 text-3xl active:border-0"}
                                    type={"email"} placeholder={"pancracia@gmail.com"}/>
                            </div>
                            <button className="">
                                Enviar
                            </button>
                        </form>
                    </section>
                </section>
            </main>
        </>
    )
}

export {RecoverPass}
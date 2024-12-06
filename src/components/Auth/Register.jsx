import { useState } from 'react'
import API from '../../utils/axios'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await API.post('/register', { name, email, password })
            setMessage(response.data.message)
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error en el registro')
        }
    }

    return (
        <div>
            <h2>Registro</h2>
            <form className='flex flex-col gap-4' onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit"> Registrar</button>
            </form>
            {message && <p>{JSON.stringify(message)}</p>}
        </div>
    )
}

export default Register
import { useEffect, useState } from 'react'
// import useAuth from '../../hooks/useAuth'
import API from '../../utils/axios'
import LogoutButton from '../LogoutButton'

const UpdateIcon = () => {
    return (
        <svg className='w-12' xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m14.304 4.844l2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565l6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"></path></svg>
    )
}

const DeleteIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"></path></svg>
    )
}

const CancelIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx={12} cy={12} r={9.25}></circle><path strokeLinecap="round" d="m8.875 8.875l6.25 6.25m0-6.25l-6.25 6.25"></path></g></svg>
    )
}
const SaveIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="M21.25 9.16v7.987a4.1 4.1 0 0 1-1.204 2.901a4.1 4.1 0 0 1-2.906 1.202H6.86a4.1 4.1 0 0 1-2.906-1.202a4.1 4.1 0 0 1-1.204-2.901V6.853a4.1 4.1 0 0 1 1.204-2.901A4.1 4.1 0 0 1 6.86 2.75h8.35a3 3 0 0 1 2.25.998l3 3.415c.501.545.783 1.256.79 1.997"></path><path d="M7 21.22v-5.241a1.995 1.995 0 0 1 2-1.997h6a2 2 0 0 1 2 1.997v5.241M15.8 2.81v4.183a1.526 1.526 0 0 1-1.52 1.528H9.72A1.53 1.53 0 0 1 8.2 6.993V2.75m1.946 15.108h3.708"></path></g></svg>
    )
}

function UsersPage() {
    const [users, setUsers] = useState([])
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.get('/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error.response?.data?.error || error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Eliminar Usuarios
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                await API.delete(`/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Usuario eliminado correctamente');
                fetchUsers(); // Recargar la lista de usuarios
            } catch (error) {
                console.error('Error al eliminar usuario:', error.response?.data?.error || error.message);
            }
        }
    };

    // Editar Usuarios
    const handleEdit = (user) => {
        setEditingUser(user.id);
        setFormData({ name: user.name, email: user.email });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await API.put(
                `/users/${editingUser}`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Usuario actualizado correctamente');
            setEditingUser(null);
            fetchUsers(); // Recargar la lista de usuarios
        } catch (error) {
            console.error('Error al actualizar usuario:', error.response?.data?.error || error.message);
        }
    };

    return (
        <main className="w-screen h-screen bg-[#0D0D28] flex items-center justify-center">
            <div className={"w-5/6 text-xl"}>
                <h1 className='font-black text-5xl'>Usuarios Registrados</h1>
                <LogoutButton className={"absolute top-0 right-0 m-4 flex gap-4 text-xl rounded-full items-center justify-center font-bold h-12 px-4 bg-white text-[#1d1f36] focus:outline-none"} />
                <ul className={"flex flex-col items-center m-auto px-8 py-8 bg-[#1d1f36] w-3/4 h-auto rounded-xl"}>
                    {users.map((user) => (
                        <li className={"w-full flex justify-around"} key={user.id}>
                            {editingUser === user.id ? (
                                <div className='flex gap-4 items-center justify-between'>
                                    <div className={"flex rounded-xl flex-col px-4 py-2 h-auto items-start bg-[#37445d] mb-3"}>
                                        <label className={"text-slate-400 text-xm h-5"} htmlFor="name">Nambre</label>
                                        <input
                                            className={"text-white focus:outline-none text-slate-400 w-full h-4 bg-transparent p-0 text-3xl active:border-0"}
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Nombre"
                                        />
                                    </div>
                                    <div className={"flex rounded-xl flex-col px-4 py-2 h-auto items-start bg-[#37445d] mb-3"}>
                                        <label className={"text-slate-400 text-xm h-5"} htmlFor="password">CONTRASEÑA</label>
                                        <input
                                            className={"text-white focus:outline-none text-slate-400 w-full h-4 bg-transparent p-0 text-3xl active:border-0"}
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="Correo electrónico"
                                        />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <button className='flex gap-2 rounded-full items-center justify-center font-bold w-1/2 h-8 px-4 bg-green-500 text-[#1d1f36] focus:outline-none'  onClick={handleSave}>Guardar <SaveIcon /></button>
                                        <button className='flex gap-2 rounded-full items-center justify-center font-bold w-1/2 h-8 px-4 bg-rose-500 text-[#1d1f36] focus:outline-none' onClick={() => setEditingUser(null)}>Cancelar <CancelIcon /></button>
                                    </div>
                                </div>
                            ) : (
                                <div className='w-full flex items-center justify-between'>
                                    <div className='m-2 w-full flex items-center justify-between'>
                                        {user.name} ({user.email})
                                        <div className='flex gap-2 justify-center items-center'>
                                            <button className='flex gap-2 rounded-full items-center justify-center font-bold w-1/2 h-8 px-4 bg-green-500 text-[#1d1f36] focus:outline-none' onClick={() => handleEdit(user)}>Editar <UpdateIcon /></button>
                                            <button className='flex gap-2 rounded-full items-center justify-center font-bold w-1/2 h-8 px-4 bg-rose-500 text-[#1d1f36] focus:outline-none' onClick={() => handleDelete(user.id)}>Eliminar <DeleteIcon /> </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default UsersPage
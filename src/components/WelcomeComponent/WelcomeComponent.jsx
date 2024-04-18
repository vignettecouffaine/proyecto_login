import React, { useState, useEffect } from 'react';
import './WelcomeComponent.css'; // Asegúrate de tener los estilos adecuados

function WelcomeComponent() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios'); // Endpoint para obtener todos los usuarios
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openModal = (user) => {
    setEditedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditedUser(null);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${editedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUser)
      });
      if (!response.ok) {
        throw new Error('Error al editar el usuario');
      }
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-green-800 min-h-screen py-8">
      <div className="table-container flex justify-center items-center mb-8">
        <table className="relative overflow-x-auto text-gray-500 dark:text-gray-400 bg-green-700">
          <thead className="text-xs text-gray-700 uppercase bg-green-500 dark:bg-green-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contraseña
              </th>
              <th scope="col" className="px-6 py-3">
                Edad
              </th>
              <th scope="col" className="px-6 py-3">
                
              </th>
              <th scope="col" className="px-6 py-3">
                
              </th> 
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white border-b dark:bg-green-500 dark:border-green-700" : "bg-gray-100 border-b dark:bg-green-800 dark:border-green-700"}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.Nombre}</td>
                <td className="px-6 py-4">{user.Email}</td>
                <td className="px-6 py-4">******</td> {/* Aquí se oculta la contraseña */}
                <td className="px-6 py-4">{user.Edad}</td>
                <td className="px-6 py-4">
                  <button className="my-button bg-green-600 hover:bg-green-700" onClick={() => openModal(user)}>Editar</button>
                </td>
                <td className="px-6 py-4">
                  <button className="my-button bg-red-600 hover:bg-red-700" onClick={() => deleteUser(user._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Botones de cerrar sesión y ver calificaciones */}
      <div className="flex justify-center mb-8">
        <button className="my-button bg-green-600 hover:bg-green-700 mr-4" onClick={() => window.location.href = '/calificaciones'}>Ver Calificaciones</button>
        <button className="my-button bg-red-600 hover:bg-red-700" onClick={() => window.location.href = '/'}>Cerrar Sesión</button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div id="crud-modal" tabIndex="-1" aria-hidden={!isModalOpen} className={`fixed top-0 right-0 left-0 z-50 h-screen bg-green-800 bg-opacity-50 flex justify-center items-center ${isModalOpen ? '' : 'hidden'}`}>
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-green-600 rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-white">
                  Editar Usuario
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Cerrar modal</span>
                </button>
              </div>
              {/* Formulario de edición */}
              <form className="p-4 md:p-5 bg-green-600 rounded-lg" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-white">Nombre</label>
                    <input type="text" name="Nombre" id="nombre" value={editedUser.Nombre} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 placeholder-gray-400 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese Nombre" required />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                    <input type="email" name="Email" id="email" value={editedUser.Email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 placeholder-gray-400 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese Email" required />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="edad" className="block mb-2 text-sm font-medium text-white">Edad</label>
                    <input type="number" name="Edad" id="edad" value={editedUser.Edad} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 placeholder-gray-400 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese Edad" required />
                  </div>
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-4">
                    Aceptar
                  </button>
                  <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={closeModal}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WelcomeComponent;

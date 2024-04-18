import React, { useState, useEffect } from 'react';
import './ReprobadosComponent.css';

function ReprobadosComponent({ userId }) {
  const [calificaciones, setCalificaciones] = useState([]);

  useEffect(() => {
    async function fetchCalificaciones() {
      try {
        const response = await fetch(`http://localhost:3000/calificaciones?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener las calificaciones');
        }
        const data = await response.json();
        setCalificaciones(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchCalificaciones();
  }, [userId]);

  return (
    <div className="container mt-4 flex flex-col items-center">
      <table className="relative overflow-x-auto text-gray-500 dark:text-gray-400 bg-green-800">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-green-800 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Usuario
            </th>
            <th scope="col" className="px-6 py-3">
              Materia
            </th>
            <th scope="col" className="px-6 py-3">
              Calificación
            </th>
          </tr>
        </thead>
        <tbody>
          {calificaciones.map((calificacion, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white border-b dark:bg-green-800 dark:border-green-700" : "bg-gray-100 border-b dark:bg-g-800 dark:border-gray-700"}>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{calificacion.userId}</td>
              <td className="px-6 py-4">{calificacion.materiaId}</td>
              <td className="px-6 py-4">{calificacion.calificacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="my-button bg-green-500 text-white mt-4" onClick={() => window.location.href = '/'}>Cerrar Sesión</button>
    </div>
  );
}

export default ReprobadosComponent;

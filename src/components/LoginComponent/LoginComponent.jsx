import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import "./LoginComponent.css"; 

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Mostrar mensaje emergente de éxito
        alert('Inicio de sesión exitoso!');

        // Redireccionar según el correo electrónico
        if (email === 'adm@gmail.com') {
          window.location.href = "/usuarios";
        } else {
          window.location.href = "/calificaciones";
        }
      } else {
        // Mostrar mensaje emergente de falla
        alert('Correo o contraseña incorrectos');
        console.error('Error al iniciar sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-green-200 via-green-300 to-green-400 dark:bg-gradient-to-r dark:from-green-700 dark:via-green-600 dark:to-green-500 min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full p-8 bg-green-100 border border-green-300 rounded-lg shadow-md dark:bg-green-700">
          <h1 className="text-3xl font-bold text-green-800 dark:text-white mb-6">Inicia sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center">
              <AiOutlineMail className="text-green-800 dark:text-white mr-2" />
              <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md pl-10" placeholder="Tu correo" required />
            </div>
            <div className="mb-6 flex items-center">
              <AiOutlineLock className="text-green-800 dark:text-white mr-2" />
              <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md pl-10" placeholder="********" required />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md">
              Iniciar Sesión
            </button>
          </form>
          <p className="mt-8 text-sm text-green-800 dark:text-white">
            ¿No tienes cuenta? <a href="/registro" className="font-medium text-green-600 dark:text-green-300 hover:underline">Regístrate aquí</a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default LoginComponent;

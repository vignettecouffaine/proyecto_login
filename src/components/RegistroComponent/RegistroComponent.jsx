import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaBirthdayCake } from 'react-icons/fa';
import "./RegistroComponent.css"; 

function RegistroComponent() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edad, setEdad] = useState('');

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEdadChange = (event) => {
    setEdad(event.target.value);
  };

  const saludarUsuario = (message) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(message);
    utterThis.lang = "es-ES";
    synth.speak(utterThis);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let error = false;
  
      if (nombre.length < 6) {
        error = true;
        saludarUsuario("Tu nombre debe ser mayor a 6 caracteres. Corrígelo por favor");
      }
  
      if (password.length < 8) {
        error = true;
        saludarUsuario("La contraseña debe tener al menos 8 caracteres. Corrígela por favor");
      }
  
      if (!error) {
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Nombre: nombre, Email: email, Pass: password, Edad: edad }),
        });
        if (response.ok) {
          // Mostrar mensaje emergente de éxito
          alert('Registro exitoso!');
          // Limpiar el formulario después del registro exitoso
          setNombre('');
          setEmail('');
          setPassword('');
          setEdad('');
          // Llamar a la función saludarUsuario después del registro exitoso
          saludarUsuario("Bienvenido" + nombre +"a la pagina");
        } else {
          console.error('Error al registrar usuario:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };
  return (
    <div>
      <section className="bg-green-50 dark:bg-green-700">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-green-900 dark:text-white">
            <p>Registro</p>
          </a>
          <div className="w-full bg-green-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-green-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl dark:text-white">
                Nueva cuenta
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-green-900 dark:text-white flex items-center">
                    <FaUser className="mr-2" />
                    Nombre
                  </label>
                  <input type="text" name="nombre" id="nombre" value={nombre} onChange={handleNombreChange} className="bg-green-50 border border-green-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre completo" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-green-900 dark:text-white flex items-center">
                    <FaEnvelope className="mr-2" />
                    Correo
                  </label>
                  <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} className="bg-green-50 border border-green-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ejemplo@gmail.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-green-900 dark:text-white flex items-center">
                    <FaLock className="mr-2" />
                    Nueva contraseña
                  </label>
                  <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} placeholder="••••••••" className="bg-green-50 border border-green-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                  <label htmlFor="edad" className="block mb-2 text-sm font-medium text-green-900 dark:text-white flex items-center">
                    <FaBirthdayCake className="mr-2" />
                    Edad
                  </label>
                  <input type="number" name="edad" id="edad" value={edad} onChange={handleEdadChange} className="bg-green-50 border border-green-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Edad" required />
                </div>
                <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-primary-800">Registrarse</button>
                <p className="text-sm font-light text-green-500 dark:text-green-400">
                 ¿Ya tienes cuenta? <a href="/" className="font-medium text-green-700 hover:underline dark:text-green-300 hover:text-green-500" onClick={() => window.scrollTo(0, 0)}>Inicia Sesión</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegistroComponent;

import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from './components/LoginComponent/LoginComponent';
import RegistroComponent from "./components/RegistroComponent/RegistroComponent";
import WelcomeComponent from "./components/WelcomeComponent/WelcomeComponent";
import ReprobadosComponent from "./components/ReprobadosComponent/ReprobadosComponent";

function App() {
return (
  <Router>
    <Routes>
      <Route exact path="/" element={<LoginComponent/>}/>
      <Route exact path="/registro" element={<RegistroComponent/>}/>
      <Route exact path="/usuarios" element={<WelcomeComponent/>}/>
      <Route exact path="/calificaciones" element={<ReprobadosComponent/>}/>
      </Routes>
  </Router>
  
  
);

}

export default App
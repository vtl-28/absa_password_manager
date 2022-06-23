import React from "react";
import { Routes, Route } from "react-router-dom";
import './tailwind_output.css';
import 'flowbite';
import Home from './components/Home';
import Register from './components/Register';
import PasswordHint from './components/PasswordHint';
import Vault from "./components/Vault";
import FlashMessage from 'react-flash-message';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import DAbsa from './components/DAbsa'
import Sessions from './components/Sessions';
import Sap from './components/Sap';
import Client from './components/Client';

const App = () =>{
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="password_hint" element={<PasswordHint />} />
          <Route path="vault" element={<Vault />}>
            <Route path="d_absa" element={<DAbsa />}/>
            <Route path="sessions" element={<Sessions />}/>
            <Route path="sap" element={<Sap />}/>
            <Route path="client" element={<Client />}/>
          </Route>
        </Routes>
        <ToastContainer 
          position="top-center"
          autoClose={1000}
          transition={Zoom}
          hideProgressBar={true}
          limit={1}
        />
      </div>
    )
}

export default App;
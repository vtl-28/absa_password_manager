import React from "react";
import { Routes, Route, Link } from "react-router";
import './tailwind_output.css';
import Home from './components/Home';
import Register from './components/Register';
import PasswordHint from './components/PasswordHint';
import Vault from "./components/Vault";

const App = () =>{
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="passwordHint" element={<PasswordHint />} />
          <Route path="vault" element={<Vault />} />
        </Routes>
      </div>
    )
}

export default App;
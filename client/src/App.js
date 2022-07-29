import React from "react";
import { Routes, Route } from "react-router-dom";
import './tailwind_output.css';
import Home from './components/Home';
import Register from './components/Register';
import PasswordHint from './components/PasswordHint';
import Vault from "./components/Vault";
import DAbsa from './components/DAbsa'
import Sessions from './components/Sessions';
import Sap from './components/Sap';
import Client from './components/Client';
import UserAccount from './components/UserAccount';
import NoMatchRoute from './components/NoMatchRoute';

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
            <Route
              path="*"
              element={<NoMatchRoute />}
            />
          </Route>
          <Route path="account/:id" element={<UserAccount />}/>
          <Route
              path="*"
              element={<NoMatchRoute />}
            />
        </Routes>
      </div>
    )
}

export default App;
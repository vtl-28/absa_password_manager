import React from 'react'
import  { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js'
import './tailwind_output.css'
import 'flowbite';
import FlashMessage from 'react-flash-message';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode >
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </React.StrictMode>
    
  );
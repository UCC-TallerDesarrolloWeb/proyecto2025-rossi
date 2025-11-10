import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Layout from '@components/Layout';
import Home from '@pages/Home'; 
import Menu from '@pages/Menu';
import Sucursales from '@pages/Sucursales';
import Contacto from '@pages/Contacto';
import Carrito from '@pages/Carrito';
import '@styles/main.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home />} /> 
          <Route path="menu" element={<Menu />} />
          <Route path="sucursales" element={<Sucursales />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="carrito" element={<Carrito />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)



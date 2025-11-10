
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const getBodyClass = (pathname) => {
  if (['/contacto', '/sucursales'].includes(pathname)) {
    return 'claro';
  }
  return 'oscuro';
};

const Layout = () => {
  const location = useLocation();
  const bodyClass = getBodyClass(location.pathname);


  return (
    <div className={`app-container ${bodyClass}`}> 
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
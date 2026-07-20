import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@components/Layout';
import Carrito from '@pages/Carrito';
import Contacto from '@pages/Contacto';
import Home from '@pages/Home';
import Menu from '@pages/Menu';
import Sucursales from '@pages/Sucursales';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="menu" element={<Menu />} />
                    <Route path="sucursales" element={<Sucursales />} />
                    <Route path="contacto" element={<Contacto />} />
                    <Route path="carrito" element={<Carrito />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

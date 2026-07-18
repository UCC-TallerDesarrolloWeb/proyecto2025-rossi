import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer';
import Header from '@components/Header';

const Layout = () => {
    return (
        <div className="aplicacion">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

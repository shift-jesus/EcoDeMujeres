import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Mujeres from './pages/Mujeres';
import Perfil from './pages/Perfil';
import Audios from './pages/Audios';
import Admin from './pages/Admin';
import './index.css';

function AppContent() {
    const location = useLocation();
    const isLanding = location.pathname === '/';

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/mujeres" element={<Mujeres />} />
                <Route path="/mujeres/:id" element={<Perfil />} />
                <Route path="/audios" element={<Audios />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
            {!isLanding && <Footer />}
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}
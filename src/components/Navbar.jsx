// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.logo}>
        Eco de Mujeres
      </NavLink>

      <div className={styles.links}>
        <NavLink to="/"        className={({ isActive }) => isActive ? styles.active : ''}>
          Inicio
        </NavLink>
        <NavLink to="/mujeres" className={({ isActive }) => isActive ? styles.active : ''}>
          Mujeres
        </NavLink>
        <NavLink to="/audios"  className={({ isActive }) => isActive ? styles.active : ''}>
          Audios
        </NavLink>
        <NavLink to="/admin"   className={({ isActive }) => isActive ? styles.active : ''}>
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

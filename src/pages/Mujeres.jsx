import { useState, useEffect } from 'react';
import MujerCard from '../components/MujerCard';
import styles from './Mujeres.module.css';

export default function Mujeres() {
  const [mujeres, setMujeres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vista, setVista] = useState('grid');

  useEffect(() => {
    fetch('http://localhost:5000/api/mujeres')
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          return res.json();
        })
        .then(data => {
          if (!Array.isArray(data)) throw new Error('La respuesta no es un array');
          setMujeres(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
  }, []);

  if (loading) return <main className={styles.main}>Cargando mujeres...</main>;
  if (error) return <main className={styles.main}>❌ {error}</main>;
  if (mujeres.length === 0) return <main className={styles.main}>No hay mujeres registradas aún.</main>;

  const lideres = mujeres.filter(m => m.esLider === 1);
  const otras = mujeres.filter(m => m.esLider !== 1);

  return (
      <main className={styles.main}>
        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <p className="eyebrow">Cartagena · Colombia</p>
            <h1 className={styles.heroTitle}>Mujeres líderes</h1>
            <div className={styles.heroDivider} />
            <p className={styles.heroSub}>
              {mujeres.length} mujeres que transforman su comunidad desde adentro.
              Descubre sus historias, valentía y legado.
            </p>
          </div>
          <div className={styles.wave} />
        </div>

        <div className={styles.container}>
          {/* Toggle de vista */}
          <div className={styles.toolbar}>
            <div className={styles.toggle}>
              <button
                  className={`${styles.toggleBtn} ${vista === 'grid' ? styles.toggleActive : ''}`}
                  onClick={() => setVista('grid')}
              >
                <span className={styles.toggleIcon}>⊞</span> Grid
              </button>
              <button
                  className={`${styles.toggleBtn} ${vista === 'lista' ? styles.toggleActive : ''}`}
                  onClick={() => setVista('lista')}
              >
                <span className={styles.toggleIcon}>☰</span> Lista
              </button>
            </div>
          </div>

          {/* Sección de Líderes */}
          {lideres.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>🌟 Líderes comunitarias</h2>
                  <div className={styles.sectionDivider} />
                </div>
                <div className={vista === 'grid' ? styles.grid : styles.lista}>
                  {lideres.map(m => (
                      <div key={m.id} className={styles.cardWrapper}>
                        <MujerCard mujer={m} layout={vista} />
                      </div>
                  ))}
                </div>
              </div>
          )}

          {/* Sección de Otras Mujeres */}
          {otras.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>📢 Otras voces</h2>
                  <div className={styles.sectionDivider} />
                </div>
                <div className={vista === 'grid' ? styles.grid : styles.lista}>
                  {otras.map(m => (
                      <div key={m.id} className={styles.cardWrapper}>
                        <MujerCard mujer={m} layout={vista} />
                      </div>
                  ))}
                </div>
              </div>
          )}
        </div>
      </main>
  );
}
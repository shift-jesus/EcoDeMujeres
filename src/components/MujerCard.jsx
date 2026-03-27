import { useNavigate } from 'react-router-dom';
import styles from './MujerCard.module.css';

function getInitials(nombre) {
  return nombre
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('');
}

export default function MujerCard({ mujer, layout = 'grid' }) {
  const navigate = useNavigate();

  const cardClass = layout === 'lista' ? styles.cardList : styles.card;

  return (
      <div
          className={cardClass}
          onClick={() => navigate(`/mujeres/${mujer.id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate(`/mujeres/${mujer.id}`)}
      >
        {/* Avatar / Foto */}
        <div className={layout === 'lista' ? styles.avatarList : styles.avatar}>
          {mujer.foto ? (
              <img src={mujer.foto} alt={mujer.nombre} className={styles.foto} />
          ) : (
              <div
                  className={styles.iniciales}
                  style={{ background: mujer.color_acento }}
              >
                {getInitials(mujer.nombre)}
              </div>
          )}
        </div>

        {/* Info */}
        <div className={styles.body}>
          <span className={styles.años}>{mujer.años_texto}</span>
          <h3 className={styles.nombre}>{mujer.nombre}</h3>
          <p className={styles.rol}>{mujer.rol}</p>
          <div className={styles.cta}>
            Ver perfil <span>→</span>
          </div>
        </div>
      </div>
  );
}
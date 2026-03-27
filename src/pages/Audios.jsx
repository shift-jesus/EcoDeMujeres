import { useState, useEffect } from 'react';
import styles from './Audios.module.css';

function formatTranscripcion(texto) {
    if (!texto) return null;
    const lineas = texto.split('\n');
    return lineas.map((linea, idx) => {
        if (linea.includes('Entrevistador:')) {
            return (
                <div key={idx} className={styles.question}>
                    <span className={styles.questionLabel}>🎙️ Presentadora:</span>
                    <span className={styles.questionText}>
            {linea.replace('Entrevistador:', '').trim()}
          </span>
                </div>
            );
        } else if (linea.includes('Mujer entrevistada:')) {
            return (
                <div key={idx} className={styles.answer}>
                    <span className={styles.answerLabel}>🗣️ Respuesta:</span>
                    <span className={styles.answerText}>
            {linea.replace('Mujer entrevistada:', '').trim()}
          </span>
                </div>
            );
        } else if (linea.trim()) {
            return <p key={idx} className={styles.plainText}>{linea.trim()}</p>;
        }
        return null;
    });
}

export default function Audios() {
    const [mujeres, setMujeres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState({});
    const [audioErrors, setAudioErrors] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/api/mujeres')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (!Array.isArray(data)) throw new Error('La respuesta no es un array');
                const conAudio = data.filter(m => m.audio && m.audio.trim() !== '');
                setMujeres(conAudio);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const toggleTranscript = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAudioError = (id) => {
        setAudioErrors(prev => ({ ...prev, [id]: true }));
    };

    const PREVIEW_LENGTH = 400;

    if (loading) return <main className={styles.main}>Cargando audios...</main>;
    if (error) return <main className={styles.main}>❌ {error}</main>;
    if (mujeres.length === 0) return <main className={styles.main}>No hay audios disponibles aún.</main>;

    return (
        <main className={styles.main}>
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className="eyebrow">Testimonios en audio</p>
                    <h1 className={styles.heroTitle}>Voces que inspiran</h1>
                    <div className={styles.heroDivider} />
                    <p className={styles.heroSub}>
                        Escucha las historias, emociones y sueños de mujeres que transforman sus comunidades.
                    </p>
                </div>
                <div className={styles.wave} />
            </div>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {mujeres.map(m => {
                        const isExpanded = expanded[m.id];
                        const full = m.transcripcion;
                        const preview = full ? full.substring(0, PREVIEW_LENGTH) + '...' : '';
                        const showButton = full && full.length > PREVIEW_LENGTH;

                        return (
                            <div key={m.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div>
                                        <h2 className={styles.cardName}>{m.nombre}</h2>
                                        <p className={styles.cardRol}>{m.rol}</p>
                                    </div>
                                    {m.esLider === 1 && <span className={styles.liderBadge}>🌟 Líder comunitaria</span>}
                                </div>

                                <div className={styles.audioWrapper}>
                                    {!audioErrors[m.id] ? (
                                        <audio
                                            controls
                                            src={m.audio}
                                            className={styles.audioPlayer}
                                            onError={() => handleAudioError(m.id)}
                                        />
                                    ) : (
                                        <div className={styles.errorMessage}>
                                            ⚠️ No se pudo cargar el audio. Intenta más tarde.
                                        </div>
                                    )}
                                </div>

                                {full && (
                                    <div className={styles.transcripcionWrapper}>
                                        <button
                                            className={styles.transcriptToggle}
                                            onClick={() => toggleTranscript(m.id)}
                                        >
                                            {isExpanded ? '📖 Ocultar transcripción' : '📖 Ver transcripción'}
                                        </button>
                                        <div className={`${styles.transcripcion} ${isExpanded ? styles.expanded : ''}`}>
                                            <div className={styles.dialog}>
                                                {isExpanded
                                                    ? formatTranscripcion(full)
                                                    : formatTranscripcion(preview)}
                                            </div>
                                            {showButton && (
                                                <button
                                                    className={styles.toggleFull}
                                                    onClick={() => toggleTranscript(m.id)}
                                                >
                                                    {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
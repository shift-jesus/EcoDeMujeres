import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Perfil.module.css';

function getInitials(nombre) {
    return nombre
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('');
}

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
            return (
                <p key={idx} className={styles.plainText}>
                    {linea.trim()}
                </p>
            );
        }
        return null;
    });
}

export default function Perfil() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mujer, setMujer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/mujeres/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setMujer(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error al cargar perfil:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <main className={styles.main}>Cargando perfil...</main>;
    }

    if (error || !mujer) {
        return (
            <main className={styles.notFound}>
                <p>Perfil no encontrado.</p>
                <button className="btn-outline" onClick={() => navigate('/mujeres')}>
                    Volver al catálogo
                </button>
            </main>
        );
    }

    const PREVIEW_LENGTH = 400;
    const fullTranscript = mujer.transcripcion;
    const preview = fullTranscript
        ? fullTranscript.substring(0, PREVIEW_LENGTH) + '...'
        : '';
    const showButton = fullTranscript && fullTranscript.length > PREVIEW_LENGTH;

    return (
        <main className={styles.main}>
            <div className={styles.colorBand} style={{ background: mujer.color_fondo }} />
            <div className={styles.container}>
                <button className={styles.volver} onClick={() => navigate('/mujeres')}>
                    ← Volver
                </button>

                <div className={styles.avatarWrap}>
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

                <div className={styles.info}>
                    <p className="eyebrow">{mujer.años_texto}</p>
                    <h1 className={styles.nombre}>{mujer.nombre}</h1>
                    <p className={styles.rol}>{mujer.rol}</p>
                    <div className="divider" />

                    <p className={styles.narrativa}>{mujer.descripcion_narrativa}</p>

                    <div className={styles.bloques}>
                        <div className={styles.bloque}>
                            <h3 className={styles.bloqueTitle}>¿Por qué es conocida?</h3>
                            <p className={styles.bloqueText}>{mujer.por_que_conocida}</p>
                        </div>
                        <div className={styles.bloque}>
                            <h3 className={styles.bloqueTitle}>¿Qué ha hecho por la comunidad?</h3>
                            <p className={styles.bloqueText}>{mujer.que_ha_hecho}</p>
                        </div>
                    </div>

                    {mujer.audio && (
                        <div className={styles.audioSection}>
                            <h3 className={styles.bloqueTitle}>Testimonio en audio</h3>
                            <audio controls src={mujer.audio} className={styles.audio} />
                            {fullTranscript && (
                                <div className={styles.transcripcion}>
                                    <h3 className={styles.bloqueTitle}>Transcripción</h3>
                                    <div className={styles.dialog}>
                                        {expanded
                                            ? formatTranscripcion(fullTranscript)
                                            : formatTranscripcion(preview)}
                                    </div>
                                    {showButton && (
                                        <button
                                            className={styles.toggleButton}
                                            onClick={() => setExpanded(!expanded)}
                                        >
                                            {expanded ? 'Mostrar menos' : 'Mostrar más'}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {mujer.consentimiento_pdf && (
                        <div className={styles.consentimiento}>
                            <h3 className={styles.bloqueTitle}>Acta de consentimiento</h3>
                            <a
                                href={mujer.consentimiento_pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline"
                                style={{ display: 'inline-block', textDecoration: 'none' }}
                            >
                                Ver documento PDF
                            </a>
                        </div>
                    )}

                    {!mujer.audio && !mujer.consentimiento_pdf && (
                        <p className={styles.placeholder}>Audio y documentos próximamente.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
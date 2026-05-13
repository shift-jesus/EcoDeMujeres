import styles from './Footer.module.css';

const recursos = [
    {
        id: 1,
        nombre: "IPS Niños de Papel",
        calificacion: "4.6",
        tipo: "Apoyo Psicológico y Salud Mental",
        descripcion: "Atención psicológica y psicosocial, programas para niños, jóvenes y familias, orientación y acompañamiento terapéutico.",
        link: "https://www.ninosdepapel.org/",
    },
    {
        id: 2,
        nombre: "Fundación Ser Social",
        calificacion: "4.5",
        tipo: "Apoyo Social y Comunitario",
        descripcion: "Programas comunitarios, apoyo social y orientación familiar, programas de inclusión social.",
        link: "https://www.fundacionsersocial.org/",
    },
    {
        id: 3,
        nombre: "Defensoría del Pueblo",
        calificacion: null,
        tipo: "Apoyo Legal y Protección",
        descripcion: "Asesoría jurídica gratuita, defensa de derechos humanos, apoyo en casos de violencia y discriminación.",
        link: "https://www.defensoria.gov.co/",
    },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Rutas de Apoyo</h2>
                    <p className={styles.subtitle}>
                        Recursos centrados en Cartagena de Indias para mujeres y familias que necesitan orientación,
                        apoyo psicológico, social o legal.
                    </p>
                </div>

                <div className={styles.grid}>
                    {recursos.map((recurso) => (
                        <div key={recurso.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{recurso.nombre}</h3>
                                {recurso.calificacion && (
                                    <span className={styles.rating}>🟢 {recurso.calificacion}</span>
                                )}
                            </div>
                            <p className={styles.cardType}>{recurso.tipo}</p>
                            <p className={styles.cardDesc}>{recurso.descripcion}</p>
                            <a
                                href={recurso.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.linkButton}
                            >
                                {recurso.nombre === "Defensoría del Pueblo" ? "Atención presencial" : "Más Información →"}
                            </a>
                        </div>
                    ))}
                </div>

                <div className={styles.emergency}>
                    <h3 className={styles.emergencyTitle}>Líneas de Ayuda Inmediata</h3>
                    <div className={styles.emergencyList}>
                        <div>📞 Línea 123 – Emergencias</div>
                        <div>📞 155 – Atención a mujeres víctimas de violencia</div>
                        <div>📞 (605) 656 2288 – Defensoría del Pueblo Cartagena</div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.credit}>
                        Vigilada Mineducación · Proyecto de Estudiantes de Ingeniería de la Universidad UniNuñez
                    </p>
                    <p className={styles.year}>© 2026 Eco de Mujeres</p>
                </div>
            </div>
        </footer>
    );
}
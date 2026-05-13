// src/components/KpiDashboard.jsx
import React from 'react';
import styles from './KpiDashboard.module.css';

const kpiData = [
  { label: "Madres cabeza de hogar", value: 70, color: "#F97316", icon: "👩‍👧‍👦" },
  { label: "No completaron estudios superiores", value: 85, color: "#E67E22", icon: "📚" },
  { label: "Desean emprender negocio propio", value: 65, color: "#F39C12", icon: "💼" },
  { label: "Mencionan machismo como obstáculo", value: 40, color: "#D35400", icon: "⚖️" },
  { label: "Reciben apoyo familiar", value: 60, color: "#1ABC9C", icon: "🤝" },
  { label: "Trabajan en oficios informales", value: 75, color: "#3498DB", icon: "🛠️" },
  { label: "Creen que educación influye mucho", value: 90, color: "#9B59B6", icon: "🎓" },
  { label: "Abandonaron estudios por hijos", value: 50, color: "#E74C3C", icon: "👶" }
];

export default function KpiDashboard() {
  return (
    <div className={styles.kpiWrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>📊 Dashboard de indicadores</h2>
        <p className={styles.subtitle}>Datos extraídos de las entrevistas a mujeres de la comunidad</p>
      </div>
      <div className={styles.grid}>
        {kpiData.map((item, idx) => (
          <div key={idx} className={styles.card} style={{ borderBottomColor: item.color }}>
            <div className={styles.icon} style={{ backgroundColor: item.color }}>
              {item.icon}
            </div>
            <p className={styles.label}>{item.label}</p>
            <div className={styles.circleWrapper}>
              <svg className={styles.circle} viewBox="0 0 120 120">
                <circle className={styles.circleBg} cx="60" cy="60" r="54" />
                <circle
                  className={styles.circleFill}
                  cx="60"
                  cy="60"
                  r="54"
                  stroke={item.color}
                  strokeDasharray={`${2 * Math.PI * 54 * (item.value / 100)} ${2 * Math.PI * 54 * (1 - item.value / 100)}`}
                />
                <text x="60" y="75" textAnchor="middle" className={styles.circleText}>
                  {item.value}%
                </text>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
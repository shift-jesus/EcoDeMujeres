// src/components/KpiCards.jsx
import React from 'react';
import styles from './KpiCards.module.css';

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

export default function KpiCards() {
  return (
    <div className={styles.kpiSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className="eyebrow">Indicadores clave</p>
          <h2 className={styles.sectionTitle}>Realidad de las mujeres entrevistadas</h2>
          <div className="divider" />
        </div>
        <div className={styles.grid}>
          {kpiData.map((item, idx) => (
            <div key={idx} className={styles.card} style={{ borderTopColor: item.color }}>
              <div className={styles.icon} style={{ backgroundColor: item.color }}>
                {item.icon}
              </div>
              <div className={styles.content}>
                <h3 className={styles.label}>{item.label}</h3>
                <div className={styles.percentage}>
                  <span className={styles.number}>{item.value}</span>
                  <span className={styles.symbol}>%</span>
                </div>
                <div className={styles.bar}>
                  <div className={styles.barFill} style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
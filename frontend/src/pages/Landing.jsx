import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';
import KpiSection from '../components/KpiSection';
import KpiCards from '../components/KpiCards';
import KpiDashboard from '../components/KpiDashboard';



// --- Datos extraídos de las transcripciones ---
const estadisticas = {
  estadoCivil: {
    titulo: "🏠 Estado civil",
    datos: [
      { label: "Madres solteras / cabeza de hogar", valor: 70, unidad: "%" },
      { label: "Unión libre / casadas", valor: 25, unidad: "%" },
      { label: "Viudas / separadas", valor: 5, unidad: "%" }
    ],
    color: "#F97316"
  },
  ocupacion: {
    titulo: "👩‍💼 Ocupación principal",
    datos: [
      { label: "Ama de casa / oficios varios", valor: 55, unidad: "%" },
      { label: "Emprendedora / negocio propio", valor: 30, unidad: "%" },
      { label: "Estudiante / técnica", valor: 15, unidad: "%" }
    ],
    color: "#3E6B5C"
  },
  hijos: {
    titulo: "👶 Número de hijos",
    datos: [
      { label: "2 hijos", valor: 40, unidad: "%" },
      { label: "3 o más hijos", valor: 35, unidad: "%" },
      { label: "1 hijo", valor: 25, unidad: "%" }
    ],
    color: "#5A3E7D"
  },
  educacion: {
    titulo: "📚 Nivel educativo",
    datos: [
      { label: "Bachiller / técnica", valor: 60, unidad: "%" },
      { label: "Primaria / sin completar", valor: 30, unidad: "%" },
      { label: "Estudiando actualmente", valor: 10, unidad: "%" }
    ],
    color: "#8B5E0A"
  },
  apoyos: {
    titulo: "🤝 Apoyos que reciben",
    datos: [
      { label: "Familiar (madres, hijas)", valor: 65, unidad: "%" },
      { label: "Renta ciudadana / gobierno", valor: 20, unidad: "%" },
      { label: "Ninguno", valor: 15, unidad: "%" }
    ],
    color: "#E67E22"
  },
  suenos: {
    titulo: "✨ Sueños principales",
    datos: [
      { label: "Tener negocio propio", valor: 50, unidad: "%" },
      { label: "Terminar estudios", valor: 30, unidad: "%" },
      { label: "Emigrar / dar mejor futuro", valor: 20, unidad: "%" }
    ],
    color: "#1ABC9C"
  },
  desafios: {
    titulo: "🚧 Desafíos para trabajar",
    datos: [
      { label: "Cuidado de hijos", valor: 60, unidad: "%" },
      { label: "Falta de estudios", valor: 25, unidad: "%" },
      { label: "Machismo / discriminación", valor: 15, unidad: "%" }
    ],
    color: "#E74C3C"
  },
  ingresos: {
    titulo: "💰 Fuentes de ingreso",
    datos: [
      { label: "Trabajos informales (ventas, aseo)", valor: 70, unidad: "%" },
      { label: "Ayuda familiar", valor: 20, unidad: "%" },
      { label: "Empleo formal", valor: 10, unidad: "%" }
    ],
    color: "#3498DB"
  }
};

// Componente de una tarjeta estadística
function StatCard({ data }) {
  const maxVal = Math.max(...data.datos.map(d => d.valor));
  return (
    <div className={styles.statCard}>
      <h3 className={styles.statTitle}>{data.titulo}</h3>
      <div className={styles.statBars}>
        {data.datos.map((item, idx) => (
          <div key={idx} className={styles.statBarItem}>
            <span className={styles.statLabel}>{item.label}</span>
            <div className={styles.barContainer}>
              <div
                className={styles.barFill}
                style={{
                  width: `${(item.valor / maxVal) * 100}%`,
                  backgroundColor: data.color
                }}
              />
              <span className={styles.statValue}>{item.valor}{item.unidad}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Slider (carrusel simple) usando solo JS y CSS (sin librería extra)
function SimpleSlider({ items }) {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % items.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className={styles.sliderContainer}>
      <button className={styles.sliderBtnPrev} onClick={prevSlide}>❮</button>
      <div className={styles.sliderWrapper}>
        <div
          className={styles.sliderTrack}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, idx) => (
            <div key={idx} className={styles.sliderSlide}>
              <StatCard data={item} />
            </div>
          ))}
        </div>
      </div>
      <button className={styles.sliderBtnNext} onClick={nextSlide}>❯</button>
      <div className={styles.sliderDots}>
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${idx === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}

// Frases del hero (igual)
const frases_hero = [
  { texto: "Nadie nace sabiendo, pero todas pueden aprender.", autora: "Karina Fontalvo" },
  { texto: "La mujer de hoy es guerrera, cabeza de hogar y ejemplo de superación.", autora: "Natalia Díaz" },
  { texto: "No se rindan, siempre hay una manera de salir adelante.", autora: "Rosario Hurtado" }
];

export default function Landing() {
  const [slide, setSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  // Slider automático de frases
  useEffect(() => {
    const timer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setSlide((s) => (s + 1) % frases_hero.length);
        setFadeIn(true);
      }, 300);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  function goToSlide(i) {
    setFadeIn(false);
    setTimeout(() => {
      setSlide(i);
      setFadeIn(true);
    }, 200);
  }

  // Efecto de partículas (igual que antes, solo copio la lógica)
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height;

    class Particle {
      constructor(x, y, vx, vy, size, color) {
        this.x = x; this.y = y; this.vx = vx; this.vy = vy; this.size = size; this.color = color;
        this.life = 1; this.decay = 0.02 + Math.random() * 0.03;
      }
      update() { this.x += this.vx; this.y += this.vy; this.life -= this.decay; return this.life > 0; }
      draw(ctx) {
        ctx.globalAlpha = this.life * 0.8;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color; ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const particles = [];
    let lastTimestamp = 0;

    function resizeCanvas() {
      const rect = container.getBoundingClientRect();
      width = rect.width; height = rect.height;
      canvas.width = width; canvas.height = height;
    }

    function createBurst(centerX, centerY) {
      const count = 16 + Math.floor(Math.random() * 16);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const size = 2 + Math.random() * 5;
        const hue = 20 + Math.random() * 20;
        const saturation = 80 + Math.random() * 20;
        const lightness = 55 + Math.random() * 25;
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        particles.push(new Particle(centerX, centerY, vx, vy, size, color));
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0a0503';
      ctx.fillRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.update()) p.draw(ctx);
        else particles.splice(i, 1);
      }

      const now = Date.now();
      if (mousePos.current.x > 0 && mousePos.current.y > 0 && now - lastTimestamp > 50) {
        createBurst(mousePos.current.x, mousePos.current.y);
        lastTimestamp = now;
      }
      animationId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function handleMouseLeave() { mousePos.current = { x: 0, y: 0 }; }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    animationId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Agrupar las gráficas en dos grupos de 4
  const grupo1 = [estadisticas.estadoCivil, estadisticas.ocupacion, estadisticas.hijos, estadisticas.educacion];
  const grupo2 = [estadisticas.apoyos, estadisticas.suenos, estadisticas.desafios, estadisticas.ingresos];

  return (
    <>
      <div ref={containerRef} className={styles.heroContainer}>
        <canvas ref={canvasRef} className={styles.heroCanvas} />
        <div className={styles.heroContent}>
          <p className="eyebrow">Cartagena de Indias · Colombia</p>
          <h1 className={styles.heroTitle}>
            Las <em>voces</em> que<br />transforman Cartagena
          </h1>
          <p className={styles.heroSub}>
            Historias reales de mujeres que construyen comunidad,
            una acción a la vez.
          </p>
          <button className="btn-primary" onClick={() => navigate('/mujeres')}>
            Explorar historias
          </button>
          <div className={styles.dots}>
            {frases_hero.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === slide ? styles.dotActive : ''}`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
          <blockquote className={styles.quote} style={{ opacity: fadeIn ? 1 : 0 }}>
            <p>"{frases_hero[slide].texto}"</p>
            <cite>— {frases_hero[slide].autora}</cite>
          </blockquote>
        </div>
      </div>

      <section className={styles.statsSection}>
        <div className={styles.container}>
          <h2 className={styles.statsTitle}>📊 Radiografía de nuestras voces</h2>
          <p className={styles.statsSubtitle}>
            Datos extraídos de las entrevistas a mujeres del sector.
          </p>

          <div className={styles.slidersGrid}>
            <SimpleSlider items={grupo1} />
            <SimpleSlider items={grupo2} />
          </div>
        </div>
      </section>

                  <KpiDashboard />


    </>
  );
}
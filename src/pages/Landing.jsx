import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mujeres, frases_hero } from '../data/mujeres';
import MujerCard from '../components/MujerCard';
import styles from './Landing.module.css';

export default function Landing() {
  const [slide, setSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  // Slider automático
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

  // Configuración de partículas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height;

    class Particle {
      constructor(x, y, vx, vy, size, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.color = color;
        this.life = 1;
        this.decay = 0.02 + Math.random() * 0.03;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        return this.life > 0;
      }
      draw(ctx) {
        ctx.globalAlpha = this.life * 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const particles = [];
    let lastTimestamp = 0;

    function resizeCanvas() {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    }

    function createBurst(centerX, centerY) {
      const count = 16 + Math.floor(Math.random() * 16);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const size = 2 + Math.random() * 5;
        // Colores naranja/ámbar/rojo
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

      // Fondo oscuro sólido (negro puro)
      ctx.fillStyle = '#0a0503';
      ctx.fillRect(0, 0, width, height);

      // Dibujar partículas
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const alive = p.update();
        if (alive) {
          p.draw(ctx);
        } else {
          particles.splice(i, 1);
        }
      }

      // Generar nuevas partículas en la posición del mouse si se mueve
      const now = Date.now();
      if (mousePos.current.x > 0 && mousePos.current.y > 0 && now - lastTimestamp > 50) {
        createBurst(mousePos.current.x, mousePos.current.y);
        lastTimestamp = now;
      }

      animationId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function handleMouseLeave() {
      mousePos.current = { x: 0, y: 0 };
    }

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
            <button
                className="btn-primary"
                onClick={() => navigate('/mujeres')}
            >
              Explorar historias
            </button>
            <div className={styles.dots}>
              {frases_hero.map((_, i) => (
                  <button
                      key={i}
                      className={`${styles.dot} ${i === slide ? styles.dotActive : ''}`}
                      onClick={() => goToSlide(i)}
                      aria-label={`Frase ${i + 1}`}
                  />
              ))}
            </div>
            <blockquote
                className={styles.quote}
                style={{ opacity: fadeIn ? 1 : 0, transition: 'opacity 0.3s' }}
            >
              <p>"{frases_hero[slide].texto}"</p>
              <cite>— {frases_hero[slide].autora}</cite>
            </blockquote>
          </div>
        </div>

        <section className={styles.mujeresSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className="eyebrow">Catálogo de lideresas</p>
              <h2 className={styles.sectionTitle}>Mujeres líderes</h2>
              <div className="divider" />
            </div>
            <div className={styles.grid}>
              {mujeres.slice(0, 4).map((m) => (
                  <MujerCard key={m.id} mujer={m} />
              ))}
            </div>
            <div className={styles.verTodas}>
              <button className="btn-outline" onClick={() => navigate('/mujeres')}>
                Ver todas las historias
              </button>
            </div>
          </div>
        </section>
      </>
  );
}
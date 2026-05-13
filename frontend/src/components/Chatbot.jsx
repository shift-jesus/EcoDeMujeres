// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Copy, Heart } from 'lucide-react';

const Chatbot = ({ isOpen, onClose, isDarkMode, onNotify }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: "🌸 ¡Hola! Soy el asistente de Eco de Mujeres. ¿Qué te gustaría saber sobre nuestro proyecto?", sender: "bot" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const questions = [
    {
      id: 1,
      text: "👩‍🦰 ¿Qué es Eco de Mujeres?",
      answer: "Eco de Mujeres es una plataforma digital que documenta y difunde las historias de mujeres líderes comunitarias en Cartagena de Indias. A través de perfiles individuales, testimonios en audio, transcripciones y documentos de consentimiento informado, buscamos preservar la memoria y dar visibilidad a mujeres que transforman sus barrios desde adentro.",
      link: null
    },
    {
      id: 2,
      text: "🌟 ¿Quiénes son las mujeres líderes?",
      answer: "Tenemos 4 líderes comunitarias destacadas: Ana Milena Galán (Líder de Junta de Acción Comunal), Jorlyz Pérez (Docente comunitaria), Yerlis Sofía Díaz Jiménez (Líder juvenil) y Yulaidis Moreno (Ex-presidenta JAC). También contamos con más de 10 participantes que comparten sus testimonios como 'Otras voces', muchas de ellas bajo seudónimo para proteger su identidad.",
      link: "/mujeres"
    },
    {
      id: 3,
      text: "📊 ¿Qué indicadores principales encontraron?",
      answer: "Según nuestros testimonios: el 70% son madres cabeza de hogar, el 85% no completaron estudios superiores, el 65% desean emprender negocio propio, el 40% mencionan el machismo como obstáculo, el 60% reciben apoyo familiar, el 75% trabajan en oficios informales, el 90% creen que la educación influye mucho, y el 50% abandonaron estudios por cuidado de hijos.",
      link: null
    },
    {
      id: 4,
      text: "🎙️ ¿Cómo puedo escuchar los testimonios?",
      answer: "¡Claro! Te llevaré directamente a la sección de audios donde encontrarás todos los testimonios disponibles con reproductor integrado.",
      link: "/audios",
      action: "redirect"
    },
    {
      id: 5,
      text: "🔐 ¿Qué son los seudónimos?",
      answer: "Los seudónimos son nombres ficticios que utilizamos para proteger la identidad de las mujeres entrevistadas. En las tarjetas y perfiles, verás la etiqueta 'Pseudonimo' junto al nombre. El nombre real se guarda de forma privada en nuestra base de datos, respetando así el consentimiento informado de cada participante.",
      link: null
    },
    {
      id: 6,
      text: "📱 ¿Cómo puedo acceder a las rutas de apoyo?",
      answer: "En el footer de la página encontrarás la sección 'Rutas de Apoyo' con recursos para mujeres y familias en Cartagena. También puedes hacer clic aquí para ir directamente.",
      link: "/#ayuda",
      action: "scroll"
    },
    {
      id: 7,
      text: "🛠️ ¿Qué tecnología usa la plataforma?",
      answer: "Eco de Mujeres utiliza: Frontend con React + CSS Modules, Backend con Node.js + Express, Base de datos SQLite, Autenticación JWT, Subida de archivos con Multer, y está desplegado en GitHub.",
      link: null
    },
    {
      id: 8,
      text: "📝 ¿Cómo puedo colaborar o participar?",
      answer: "Si eres una mujer líder en tu comunidad o conoces a alguien que quiera compartir su historia, puedes escribirnos al correo: jcampoy21@campusuninunez.edu.co. También puedes contribuir compartiendo el proyecto o contactándonos para alianzas.",
      link: null
    }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleQuestionClick = (question) => {
    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { text: question.text, sender: "user" }]);
    setIsTyping(true);

    setTimeout(() => {
      // Agregar respuesta del bot
      setMessages(prev => [...prev, { text: question.answer, sender: "bot" }]);
      setIsTyping(false);

      // Si la pregunta tiene una acción de redirección
      if (question.link) {
        setTimeout(() => {
          if (question.action === "redirect" || question.id === 4) {
            // Cerrar el chatbot y redirigir
            onClose();
            navigate(question.link);
            onNotify(`🔁 Redirigiendo a la sección de ${question.id === 4 ? 'audios' : 'mujeres líderes'}...`);
          } else if (question.action === "scroll") {
            onClose();
            // Para scroll a footer, usar window.location
            window.location.href = question.link;
            onNotify("🔁 Redirigiendo a las rutas de apoyo...");
          }
        }, 500);
      }
    }, 600);
  };

  const handleEmailContact = () => {
    navigator.clipboard.writeText("jcampoy21@campusuninunez.edu.co");
    onNotify("📧 Correo copiado al portapapeles: jcampoy21@campusuninunez.edu.co");
  };

  if (!isOpen) return null;

  // Agregar animación bounce si no existe
  if (!document.querySelector('#chatbot-animation-style')) {
    const style = document.createElement('style');
    style.id = 'chatbot-animation-style';
    style.textContent = `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    `;
    document.head.appendChild(style);
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '90px',
      right: '20px',
      width: '380px',
      height: '550px',
      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #f97316, #f59e0b)',
        padding: '14px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={18} color="white" />
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>Eco de Mujeres</span>
        </div>
        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <X size={18} />
        </button>
      </div>

      {/* Messages area - scrollable */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minHeight: 0
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              maxWidth: '85%',
              padding: '8px 12px',
              borderRadius: '12px',
              backgroundColor: msg.sender === 'user' ? '#f97316' : (isDarkMode ? '#374151' : '#f0f0f0'),
              color: msg.sender === 'user' ? 'white' : (isDarkMode ? '#f3f4f6' : '#1f2937'),
              fontSize: '13px',
              lineHeight: '1.4',
              wordBreak: 'break-word'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: isDarkMode ? '#374151' : '#f0f0f0',
              display: 'flex',
              gap: '4px'
            }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#f97316', borderRadius: '50%', display: 'inline-block', animation: 'bounce 0.8s infinite' }}></span>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#f97316', borderRadius: '50%', display: 'inline-block', animation: 'bounce 0.8s infinite 0.2s' }}></span>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#f97316', borderRadius: '50%', display: 'inline-block', animation: 'bounce 0.8s infinite 0.4s' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Questions area - scrollable */}
      <div style={{
        borderTop: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
        padding: '12px',
        maxHeight: '200px',
        overflowY: 'auto',
        flexShrink: 0
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: isDarkMode ? '#9ca3af' : '#6b7280'
        }}>⭐ Preguntas frecuentes:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => handleQuestionClick(q)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                color: isDarkMode ? '#f3f4f6' : '#374151',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#4b5563' : '#e5e7eb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#374151' : '#f3f4f6'}
            >
              {q.text}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
        padding: '12px',
        flexShrink: 0
      }}>
        <p style={{
          fontSize: '11px',
          textAlign: 'center',
          marginBottom: '8px',
          color: isDarkMode ? '#9ca3af' : '#6b7280'
        }}>📞 ¿Necesitas más ayuda?</p>
        <button
          onClick={handleEmailContact}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '8px',
            fontSize: '12px',
            backgroundColor: '#f97316',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f97316'}
        >
          <Copy size={14} />
          Copiar correo electrónico
        </button>
        <p style={{
          fontSize: '10px',
          textAlign: 'center',
          marginTop: '8px',
          color: isDarkMode ? '#6b7280' : '#9ca3af'
        }}>jcampoy21@campusuninunez.edu.co</p>
      </div>
    </div>
  );
};

export default Chatbot;
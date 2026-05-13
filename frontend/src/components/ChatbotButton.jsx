import React, { useState, useEffect } from 'react';
import Chatbot from './Chatbot';

const ChatbotButton = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleNotify = (message) => {
    setNotification(message);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#f97316',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        💬
      </button>

      <Chatbot
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isDarkMode={isDarkMode}
        onNotify={handleNotify}
      />

      {notification && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            padding: '12px 16px',
            backgroundColor: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#333',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 999,
            borderLeft: '4px solid #f97316',
            fontSize: '14px'
          }}
        >
          {notification}
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './LandingPage';
import CalendarTab from './CalendarTab';
import TodoTab from './TodoTab';

function App() {
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [activeTab, setActiveTab] = useState('calendar');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track window resizing to dynamically update layout styles
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleEnter() {
    setShowWorkspace(true);
  }

  if (showWorkspace === false) {
    return <LandingPage onEnter={handleEnter} />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <nav
        style={{
          width: isMobile ? '100%' : '230px',
          boxSizing: 'border-box',
          backgroundColor: '#F8FAFC',
          padding: isMobile ? '15px' : '25px 15px',
          borderRight: isMobile ? 'none' : '2px solid #E2E8F0',
          borderBottom: isMobile ? '2px solid #E2E8F0' : 'none',
        }}
      >
        <h2
          style={{
            color: '#0284C7',
            marginBottom: isMobile ? '15px' : '35px',
            paddingLeft: '10px',
            fontSize: '1.4rem',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          InstiSpace
        </h2>

        <ul
          style={{
            listStyleType: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            justifyContent: isMobile ? 'center' : 'flex-start',
            gap: '12px',
          }}
        >
          <li
            onClick={function () {
              setActiveTab('calendar');
            }}
            style={{
              padding: '12px',
              cursor: 'pointer',
              borderRadius: '8px',
              fontWeight: 'bold',
              flex: isMobile ? 1 : 'none',
              textAlign: 'center',
              background: activeTab === 'calendar' ? '#E0F2FE' : 'transparent',
              color: activeTab === 'calendar' ? '#0369A1' : '#475569',
            }}
          >
            📅 My Meetings
          </li>

          <li
            onClick={function () {
              setActiveTab('todo');
            }}
            style={{
              padding: '12px',
              cursor: 'pointer',
              borderRadius: '8px',
              fontWeight: 'bold',
              flex: isMobile ? 1 : 'none',
              textAlign: 'center',
              background: activeTab === 'todo' ? '#E0F2FE' : 'transparent',
              color: activeTab === 'todo' ? '#0369A1' : '#475569',
            }}
          >
            📋 Tasks (CRUD)
          </li>
        </ul>
      </nav>

      <main
        style={{
          flex: 1,
          padding: isMobile ? '20px' : '45px',
          backgroundColor: '#F1F5F9',
          overflowY: 'auto',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'calendar' ? <CalendarTab /> : null}
            {activeTab === 'todo' ? <TodoTab /> : null}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;

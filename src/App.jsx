import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './LandingPage';
import CalendarTab from './CalendarTab';
import TodoTab from './TodoTab';

function App() {
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [activeTab, setActiveTab] = useState('calendar');

  function handleEnter() {
    setShowWorkspace(true);
  }

  if (showWorkspace === false) {
    return <LandingPage onEnter={handleEnter} />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      <nav style={{ width: '230px', backgroundColor: '#F8FAFC', padding: '25px 15px', borderRight: '2px solid #E2E8F0' }}>
        <h2 style={{ color: '#0284C7', marginBottom: '35px', paddingLeft: '10px', fontSize: '1.4rem' }}>🚀 HubCentral</h2>
        
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <li 
            onClick={function() { setActiveTab('calendar'); }} 
            style={{ padding: '12px', cursor: 'pointer', borderRadius: '8px', fontWeight: 'bold', background: activeTab === 'calendar' ? '#E0F2FE' : 'transparent', color: activeTab === 'calendar' ? '#0369A1' : '#475569' }}
          >
            📅 My Meetings
          </li>
          
          <li 
            onClick={function() { setActiveTab('todo'); }} 
            style={{ padding: '12px', cursor: 'pointer', borderRadius: '8px', fontWeight: 'bold', background: activeTab === 'todo' ? '#E0F2FE' : 'transparent', color: activeTab === 'todo' ? '#0369A1' : '#475569' }}
          >
            📋 Tasks (CRUD)
          </li>

        </ul>
      </nav>

      <main style={{ flex: 1, padding: '45px', backgroundColor: '#F1F5F9', overflowY: 'auto' }}>
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
import React from 'react';
import { motion } from 'framer-motion';

export default function LandingPage(props) {
  function onButtonClick() {
    props.onEnter(); 
  }

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC', fontFamily: 'Arial, sans-serif' }}>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
      >
        <h1 style={{ fontSize: '2.4rem', marginBottom: '12px', color: '#0F172A' }}>Welcome to HubCentral</h1>
        <p style={{ color: '#64748B', marginBottom: '30px', fontSize: '1.1rem' }}>Internal employee directory and productivity portal.</p>
        
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onButtonClick}
          style={{ backgroundColor: '#0284C7', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
        >
          Open Dashboard
        </motion.button>
      </motion.div>

    </div>
  );
}
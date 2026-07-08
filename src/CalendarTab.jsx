import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CalendarTab() {
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const meetingsArray = [
    { id: 101, time: '09:30 AM', title: 'Project Status Update & Sync', host: 'Professor David', room: 'Lab Room 3A' },
    { id: 102, time: '11:15 AM', title: 'UI Design Feedback Session', host: 'Emma Watson', room: 'Virtual Meet Link' },
    { id: 103, time: '04:00 PM', title: 'Code Review & Merge Check', host: 'Jason Bourne', room: 'Conference Hall 1' }
  ];

  function closeDetailsBox() {
    setSelectedMeeting(null);
  }

  return (
    <div>
      <h2 style={{ marginBottom: '6px', color: '#0F172A', fontSize: '1.6rem' }}>My Daily Schedule</h2>
      <p style={{ color: '#64748B', marginBottom: '25px' }}>Select an upcoming meeting slot to preview host details.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {meetingsArray.map(function(meeting) {
          return (
            <motion.div
              key={meeting.id}
              whileHover={{ scale: 1.01 }}
              onClick={function() { setSelectedMeeting(meeting); }}
              style={{ padding: '18px', backgroundColor: 'white', borderRadius: '8px', borderLeft: '6px solid #0284C7', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
            >
              <span style={{ color: '#0284C7', fontWeight: 'bold', marginRight: '10px' }}>{meeting.time}</span> 
              <span style={{ color: '#334155', fontWeight: '500' }}>— {meeting.title}</span>
            </motion.div>
          );
        })}
      </div>

      {selectedMeeting !== null ? (
        <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#E0F2FE', borderRadius: '8px', border: '1px solid #BAE6FD' }}>
          <h3 style={{ color: '#0369A1', marginTop: 0, marginBottom: '10px' }}>{selectedMeeting.title}</h3>
          <p style={{ color: '#334155', margin: '5px 0' }}><strong>Organizer:</strong> {selectedMeeting.host}</p>
          <p style={{ color: '#334155', margin: '5px 0' }}><strong>Location Point:</strong> {selectedMeeting.room}</p>
          
          <button onClick={closeDetailsBox} style={{ marginTop: '12px', padding: '6px 14px', backgroundColor: 'white', border: '1px solid #0284C7', borderRadius: '4px', color: '#0284C7', cursor: 'pointer', fontWeight: 'bold' }}>
            Dismiss Panel
          </button>
        </div>
      ) : null}
    </div>
  );
}
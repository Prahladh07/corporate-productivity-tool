import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

export default function TodoTab() {
  const [todos, setTodos] = useState(function() {
    const saved = localStorage.getItem('corp_todos');
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [{ id: 1, text: 'Review project requirements document', completed: false }];
    }
  });

  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(function() {
    localStorage.setItem('corp_todos', JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim() === '') {
      return; 
    }

    if (editingId !== null) {
      const updatedTodos = todos.map(function(t) {
        if (t.id === editingId) {
          return { id: t.id, text: input, completed: t.completed };
        } else {
          return t;
        }
      });
      setTodos(updatedTodos);
      setEditingId(null);
    } else {
      const newTodo = { id: Date.now(), text: input, completed: false };
      setTodos([...todos, newTodo]);
    }
    setInput('');
  }

  function toggleComplete(id) {
    const altered = todos.map(function(t) {
      if (t.id === id) {
        return { id: t.id, text: t.text, completed: !t.completed };
      } else {
        return t;
      }
    });
    setTodos(altered);
  }

  function deleteTodo(id) {
    const filtered = todos.filter(function(t) {
      if (t.id !== id) {
        return true;
      } else {
        return false;
      }
    });
    setTodos(filtered);
  }

  return (
    <div>
      <h2 style={{ marginBottom: '15px' }}>Team Action Items</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={input} 
          onChange={function(e) { setInput(e.target.value); }}
          placeholder={editingId !== null ? "Edit task..." : "Add a new task..."}
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0284C7', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          {editingId !== null ? 'Update' : 'Add'}
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <AnimatePresence>
          {todos.map(function(todo) {
            return (
              <motion.div key={todo.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
                style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: 'white', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
              >
                <span 
                  onClick={function() { toggleComplete(todo.id); }}
                  style={{ textDecoration: todo.completed === true ? 'line-through' : 'none', cursor: 'pointer', color: todo.completed === true ? '#9CA3AF' : '#1F2937' }}
                >
                  {todo.completed === true ? '✅ ' : '⬜ '} {todo.text}
                </span>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={function() { setEditingId(todo.id); setInput(todo.text); }} style={{ border: 'none', background: 'transparent', color: '#0284C7', cursor: 'pointer', fontWeight: 'bold' }}>Edit</button>
                  <button onClick={function() { deleteTodo(todo.id); }} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
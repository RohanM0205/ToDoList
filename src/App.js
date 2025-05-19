import './App.css';
import Header from './MyComponents/Header';
import { ToDos } from './MyComponents/ToDos';
import { Footer } from './MyComponents/footer';
import { useState, useEffect } from 'react';

function App() {
  const initialTodos = [
    { title: 'Buy milk', desc: 'Get it from the store' },
    { title: 'Study React', desc: 'Learn components and props' },
    { title: 'Write code', desc: 'Practice daily' }
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [filteredTodos, setFilteredTodos] = useState(initialTodos);
  const [searchActive, setSearchActive] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  // Update filtered todos when todos change
  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredTodos(todos);
      setSearchActive(false);
      return;
    }
    const filtered = todos.filter(todo => 
      todo.title.toLowerCase().includes(query.toLowerCase()) ||
      (todo.desc && todo.desc.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredTodos(filtered);
    setSearchActive(true);
  };

  return (
    <>
      <Header 
        title="My To-Do's List" 
        searchbar={true} 
        onSearch={handleSearch}
        onAboutClick={() => setShowAbout(true)}
      />
      <ToDos
        todos={filteredTodos}
        onTodosChange={setTodos}
        isSearchActive={searchActive}
      />
      <Footer />
      
      {/* About Modal */}
      {showAbout && (
  <div className="modal-backdrop" style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(111, 66, 193, 0.8)', // Purple tinted overlay
    zIndex: 1050,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(3px)'
  }}>
    <div className="modal-content" style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      maxWidth: '500px',
      width: '90%',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
      border: '2px solid #6f42c1'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h4 style={{ 
          color: '#6f42c1',
          margin: 0,
          fontFamily: "'Poppins', sans-serif"
        }}>
          <i className="bi bi-info-circle-fill me-2"></i>
          About This To-Do List
        </h4>
        <button 
          onClick={() => setShowAbout(false)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: '#6f42c1',
            cursor: 'pointer',
            padding: '0 0.5rem',
            borderRadius: '50%',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f0e6ff'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          &times;
        </button>
      </div>
      
      <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
        <p style={{ marginBottom: '1rem' }}>
          This React-based To-Do app helps you organize your tasks efficiently.
        </p>
        
        <ul style={{ 
          paddingLeft: '1.5rem',
          marginBottom: '1.5rem',
          listStyleType: 'none'
        }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <i className="bi bi-check-circle-fill me-2" style={{ color: '#6f42c1' }}></i>
            Add and manage tasks
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <i className="bi bi-check-circle-fill me-2" style={{ color: '#6f42c1' }}></i>
            Powerful search functionality
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <i className="bi bi-check-circle-fill me-2" style={{ color: '#6f42c1' }}></i>
            Clean and intuitive interface
          </li>
        </ul>
        
        <div style={{ 
          backgroundColor: '#f8f5ff',
          padding: '1rem',
          borderRadius: '8px',
          borderLeft: '4px solid #6f42c1'
        }}>
          <p style={{ margin: 0, fontStyle: 'italic' }}>
            Built with React, Bootstrap, and <span style={{ color: '#6f42c1' }}>♥</span>
          </p>
        </div>
      </div>
      
      <div className="text-end mt-3">
        <button 
          className="btn"
          onClick={() => setShowAbout(false)}
          style={{
            backgroundColor: '#6f42c1',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            border: 'none',
            fontWeight: 600,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Got it!
        </button>
      </div>
    </div>
  </div>
    )}
    </>
  );
}

export default App;
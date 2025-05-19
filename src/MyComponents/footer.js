// src/MyComponents/footer.js
import React from 'react';

export const Footer = () => {
  return (
    <footer className=" text-white text-center py-3 mt-4 fixed-bottom" style={{backgroundColor: '#6f42c1'}}>
      <div className="container">
        <p className="mb-0">© {new Date().getFullYear()} To-Do List App</p>
        <small>Stay organized and productive!</small>
      </div>
    </footer>
  );
};
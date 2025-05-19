import React, { useState } from 'react';
import { ToDoItem } from './ToDoItem';

export const ToDos = ({ todos = [], indexToShow = null, onTodosChange }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', desc: '' });

  const handleDelete = (todoToDelete) => {
    const updatedTodos = todos.filter((t) => t !== todoToDelete);
    onTodosChange(updatedTodos);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = (index, updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    onTodosChange(updatedTodos);
    setEditingIndex(null);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleAddSave = () => {
    if (newTodo.title.trim()) {
      const updatedTodos = [...todos, { ...newTodo }];
      onTodosChange(updatedTodos);
      setNewTodo({ title: '', desc: '' });
      setShowAddForm(false);
    }
  };

  const handleNewTodoChange = (e) => {
    const { name, value } = e.target;
    setNewTodo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container my-4" style={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <h3 className="text-center py-3 text-white rounded" style={{backgroundColor: '#6f42c1'}}>
        To Do List
      </h3>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '20px',
        maxHeight: 'calc(100vh - 300px)'
      }}>
        {todos.length === 0 ? (
          <p className="text-center mt-4">No to-dos to display!</p>
        ) : indexToShow !== null ? (
          todos[indexToShow] ? (
            <ToDoItem
              todo={todos[indexToShow]}
              onDelete={handleDelete}
              onEdit={() => handleEdit(indexToShow)}
              onSave={(updatedTodo) => handleSave(indexToShow, updatedTodo)}
              isEditing={editingIndex === indexToShow}
            />
          ) : (
            <p className="text-center mt-4">
              No to-do item found at index {indexToShow}
            </p>
          )
        ) : (
          todos.map((todo, index) => (
            <ToDoItem
              key={index}
              todo={todo}
              onDelete={handleDelete}
              onEdit={() => handleEdit(index)}
              onSave={(updatedTodo) => handleSave(index, updatedTodo)}
              isEditing={editingIndex === index}
            />
          ))
        )}
      </div>

      <div 
        className="add-task-section" 
        style={{ 
          position: 'fixed',
          bottom: '80px',
          left: '0',
          right: '0',
          zIndex: 1000,
          padding: '0 20px',
          backgroundColor: 'white',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
        }}
      >
        {showAddForm ? (
          <div className="border-top pt-3" style={{ 
            maxWidth: '600px', 
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '20px'
          }}>
            <h5 className="mb-3 text-center" style={{ color: '#6f42c1' }}>Create New Task</h5>
            
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="title"
                value={newTodo.title}
                onChange={handleNewTodoChange}
                placeholder="Task title*"
                autoFocus
              />
            </div>
            
            <div className="mb-3">
              <textarea
                className="form-control"
                name="desc"
                value={newTodo.desc}
                onChange={handleNewTodoChange}
                rows="2"
                placeholder="Description (optional)"
              />
            </div>
            
            <div className="d-flex justify-content-end gap-2 pb-2">
              <button
                className="btn btn-outline-secondary px-4"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button
                className="btn px-4"
                onClick={handleAddSave}
                disabled={!newTodo.title.trim()}
                style={{ 
                  backgroundColor: '#6f42c1', 
                  color: 'white',
                }}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-3">
            <button
              className="btn btn-primary py-2 px-4"
              onClick={handleAddClick}
              style={{ 
                backgroundColor: '#6f42c1', 
                borderColor: '#6f42c1',
                borderRadius: '50px'
              }}
            >
              <i className="bi bi-plus-lg me-2"></i>Add New Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

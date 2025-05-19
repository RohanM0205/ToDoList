import React, { useState, useEffect } from 'react';

export const ToDoItem = ({ todo, onDelete, onEdit, onSave, isEditing }) => {
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  // Reset editedTodo when todo prop changes
  useEffect(() => {
    setEditedTodo({ ...todo });
  }, [todo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(editedTodo); // Pass the entire updated todo object
  };

  return (
    <div className="my-3 p-3 border rounded">
      {isEditing ? (
        <>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={editedTodo.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="desc"
              value={editedTodo.desc}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          <div>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onEdit(null)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h4>{todo.title}</h4>
          <p>{todo.desc}</p>
          <div>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => onEdit()}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(todo)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};
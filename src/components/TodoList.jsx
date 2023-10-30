import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, updateTodo, complete, deleteTodo, setFilter } from '../redux/reducers/TodoReducer';

export default function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const filter = useSelector((state) => state.todos.filter)

  const handleAddTodo = () => {
    dispatch(addTodo(newTodo));
    setNewTodo('');
  };

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleEditChange = (e, id) => {
    const newText = e.target.value;
    setUpdatedTodo(newText)
    dispatch(updateTodo({ id, text: newText }));
  };

  const handleSaveEdit = (id) => {
    setEditingId(null);
  };

  const [isEmpty, setIsEmpty] = useState(false)
  const [updatedTodo,setUpdatedTodo] = useState('')
  const filterTodos = todos.filter((todo) => {
    if (filter === 'all'){
      return true
    } else if (filter === 'active'){
      return !todo.completed
    } else if (filter === 'completed'){
      return todo.completed
    } else {
      return false
    }
  })

  return (
    <>
      <div>
        <input type="text" value={newTodo} onChange={(e) => { setNewTodo(e.target.value) }} className="form-control" />
        
        { newTodo.trim() === '' ? <div className='text-danger fw-bold'>isi dl lah!</div> : ''}
        <button onClick={newTodo.trim() === '' ? '' : handleAddTodo} className="btn btn-primary mt-4">Add Todo</button>
        <ul className="list-group">
          {filterTodos.map((todo) => (
            <li
              key={todo.id}
              className={`list-group-item ${todo.completed ? 'list-group-item-success' : ''}`}>
              <div className={todo.completed ? 'text-decoration-line-through' : ''}>
                {editingId === todo.id ? (
                  <div>
                    <input
                      type="text"
                      value={todo.text}
                      onChange={(e) => handleEditChange(e, todo.id)} className="form-control"
                    />
                    <button onClick={() => updatedTodo.trim() === '' ? '' : handleSaveEdit(todo.id)} className="btn btn-primary">Save</button>
                  </div>
                ) : (
                  <div>
                    {todo.text}
                    <button onClick={() => dispatch(complete({ id: todo.id }))} className="btn btn-success">
                      Done
                    </button>
                    <button onClick={() => handleEditClick(todo.id)} className="btn btn-warning">
                      Edit
                    </button>
                    <button onClick={() => dispatch(deleteTodo({ id: todo.id }))} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

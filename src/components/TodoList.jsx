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
  const [updatedTodo, setUpdatedTodo] = useState('')
  const filterTodos = todos.filter((todo) => {
    if (filter === 'all') {
      return true
    } else if (filter === 'active') {
      return !todo.completed
    } else if (filter === 'completed') {
      return todo.completed
    } else {
      return false
    }
  })

  return (
    <>
      <div className='container wrapper-todo'>
        <div className='row m-5'>
          <div className='col-12 mb-3'>
            <input type="text" value={newTodo} onChange={(e) => { setNewTodo(e.target.value) }} className="form-control" placeholder='Put Your Todo here...' />
            {newTodo.trim() === '' ? <div className='text-danger fw-bold'>Please fill your Todo!</div> : ''}
            <button className="add-btn btn btn-warning mt-4" onClick={newTodo.trim() === '' ? '' : handleAddTodo}>Add Todo</button>
          </div>
        </div>

        <ul className="list-group">
          {filterTodos.map((todo) => (
            <li
              key={todo.id}
              className={`list-group-item ${todo.completed ? 'list-group-item-success' : ''}`}>
              <div className={todo.completed ? 'text-decoration-line-through' : ''}>
                {editingId === todo.id ? (
                  <div className='row d-grid gap-2 d-md-flex justify-content-md-center'>
                    <div className='col-12'>
                      <input
                        type="text"
                        value={todo.text}
                        onChange={(e) => handleEditChange(e, todo.id)} className="form-control"
                      />
                      <button onClick={() => updatedTodo.trim() === '' ? '' : handleSaveEdit(todo.id)} className="btn btn-warning">Save</button>
                    </div>
                  </div>
                ) : (
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    {todo.text}
                    <button onClick={() => dispatch(complete({ id: todo.id }))} className="btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                      </svg>
                    </button>
                    <button onClick={() => handleEditClick(todo.id)} className="btn ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                      </svg>
                    </button>
                    <button onClick={() => dispatch(deleteTodo({ id: todo.id }))} className="btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
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
